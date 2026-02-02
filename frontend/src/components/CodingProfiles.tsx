import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SiLeetcode, SiCodeforces, SiCodechef, SiGithub } from "react-icons/si";
import { buildApiUrl } from "@/lib/utils";

interface ProfileLinks {
    leetcode: string;
    codeforces: string;
    codechef: string;
    github: string;
}

const CodingProfiles = () => {
    const [links, setLinks] = useState<ProfileLinks>({
        leetcode: '',
        codeforces: '',
        codechef: '',
        github: ''
    });
    const [ratingData, setRatingData] = useState<any[]>([]);
    const [leetCodeData, setLeetCodeData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Helper to safely fetch JSON and check for non-JSON responses (like HTML error pages)
                const safeFetchJson = async (url: string) => {
                    try {
                        const res = await fetch(url);
                        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

                        const contentType = res.headers.get("content-type");
                        if (!contentType || !contentType.includes("application/json")) {
                            // If response is not JSON (e.g. HTML error page), return null or throw
                            console.warn(`Expected JSON from ${url} but got ${contentType}`);
                            return null;
                        }

                        return await res.json();
                    } catch (e) {
                        console.error(`Failed to fetch from ${url}:`, e);
                        return null;
                    }
                };

                // Fetch profile links from our backend
                const profileData = await safeFetchJson(buildApiUrl('/api/profile'));
                if (profileData) {
                    setLinks(profileData);

                    // Fetch Codeforces rating
                    let cfHandle = '';
                    if (profileData.codeforces) {
                        const parts = profileData.codeforces.split('/');
                        cfHandle = parts[parts.length - 1] || parts[parts.length - 2];
                    }

                    if (cfHandle) {
                        const cfData = await safeFetchJson(`https://codeforces.com/api/user.rating?handle=${cfHandle}`);
                        if (cfData && cfData.status === 'OK') {
                            const formattedData = cfData.result.map((contest: any) => ({
                                contest: contest.contestName,
                                rating: contest.newRating,
                                date: new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleDateString()
                            }));
                            setRatingData(formattedData);
                        }
                    }

                    // Fetch LeetCode submission stats
                    let lcUsername = '';
                    if (profileData.leetcode) {
                        const parts = profileData.leetcode.split('/').filter((p: string) => p);
                        lcUsername = parts[parts.length - 1];
                    }

                    if (lcUsername) {
                        const lcData = await safeFetchJson(`https://leetcode-stats-api.herokuapp.com/${lcUsername}`);
                        if (lcData && lcData.status === 'success' && lcData.submissionCalendar) {
                            const calendar = lcData.submissionCalendar;
                            const formattedLcData = Object.keys(calendar).map(timestamp => ({
                                date: new Date(parseInt(timestamp) * 1000).toLocaleDateString(),
                                timestamp: parseInt(timestamp),
                                count: calendar[timestamp]
                            })).sort((a, b) => a.timestamp - b.timestamp);
                            setLeetCodeData(formattedLcData);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching coding profile data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="py-10 text-center">Loading coding profiles...</div>;
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10">Coding Profiles & Stats</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Profile Links Cards */}
                    {/* Profile Links Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        {links.leetcode ? (
                            <a href={links.leetcode} target="_blank" rel="noopener noreferrer" className="block">
                                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col items-center justify-center p-6 text-center">
                                    <SiLeetcode className="text-yellow-500 text-5xl mb-4" />
                                    <h3 className="font-bold text-lg">LeetCode</h3>
                                    <p className="text-sm text-gray-500">View Profile</p>
                                </Card>
                            </a>
                        ) : (
                            <Card className="h-full flex flex-col items-center justify-center p-6 text-center opacity-50 cursor-not-allowed">
                                <SiLeetcode className="text-gray-400 text-5xl mb-4" />
                                <h3 className="font-bold text-lg text-gray-400">LeetCode</h3>
                                <p className="text-sm text-gray-400">Not Connected</p>
                            </Card>
                        )}

                        {links.codeforces ? (
                            <a href={links.codeforces} target="_blank" rel="noopener noreferrer" className="block">
                                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col items-center justify-center p-6 text-center">
                                    <SiCodeforces className="text-red-500 text-5xl mb-4" />
                                    <h3 className="font-bold text-lg">Codeforces</h3>
                                    <p className="text-sm text-gray-500">View Profile</p>
                                </Card>
                            </a>
                        ) : (
                            <Card className="h-full flex flex-col items-center justify-center p-6 text-center opacity-50 cursor-not-allowed">
                                <SiCodeforces className="text-gray-400 text-5xl mb-4" />
                                <h3 className="font-bold text-lg text-gray-400">Codeforces</h3>
                                <p className="text-sm text-gray-400">Not Connected</p>
                            </Card>
                        )}

                        {links.codechef ? (
                            <a href={links.codechef} target="_blank" rel="noopener noreferrer" className="block">
                                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col items-center justify-center p-6 text-center">
                                    <SiCodechef className="text-brown-500 text-5xl mb-4" />
                                    <h3 className="font-bold text-lg">CodeChef</h3>
                                    <p className="text-sm text-gray-500">View Profile</p>
                                </Card>
                            </a>
                        ) : (
                            <Card className="h-full flex flex-col items-center justify-center p-6 text-center opacity-50 cursor-not-allowed">
                                <SiCodechef className="text-gray-400 text-5xl mb-4" />
                                <h3 className="font-bold text-lg text-gray-400">CodeChef</h3>
                                <p className="text-sm text-gray-400">Not Connected</p>
                            </Card>
                        )}

                        {links.github ? (
                            <a href={links.github} target="_blank" rel="noopener noreferrer" className="block">
                                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col items-center justify-center p-6 text-center">
                                    <SiGithub className="text-gray-800 text-5xl mb-4" />
                                    <h3 className="font-bold text-lg">GitHub</h3>
                                    <p className="text-sm text-gray-500">View Profile</p>
                                </Card>
                            </a>
                        ) : (
                            <Card className="h-full flex flex-col items-center justify-center p-6 text-center opacity-50 cursor-not-allowed">
                                <SiGithub className="text-gray-400 text-5xl mb-4" />
                                <h3 className="font-bold text-lg text-gray-400">GitHub</h3>
                                <p className="text-sm text-gray-400">Not Connected</p>
                            </Card>
                        )}
                    </div>

                    {/* Graphs Section */}
                    <div className="flex flex-col gap-8">
                        {/* Codeforces Graph */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Codeforces Rating History</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                {ratingData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={ratingData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis domain={['auto', 'auto']} />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="rating" stroke="#8884d8" strokeWidth={2} dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                        No rating data available or valid Codeforces handle not found.
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* LeetCode Activity Graph */}
                        <Card>
                            <CardHeader>
                                <CardTitle>LeetCode Activity (Last Year)</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                {leetCodeData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={leetCodeData}>
                                            <defs>
                                                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="count" stroke="#22c55e" fillOpacity={1} fill="url(#colorCount)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                        No activity data available or valid LeetCode username not found.
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CodingProfiles;
