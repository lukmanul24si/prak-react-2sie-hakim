import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PageHeader from "@/components/pageHeader";
import { MdPerson, MdEmail, MdPhone, MdHome, MdStar } from "react-icons/md";

export default function Profile() {
    const { profile } = useAuth();

    const tierInfo = {
        bronze: { color: "bg-orange-100 text-orange-700", next: "Silver", nextPoints: 1000, discount: "5%" },
        silver: { color: "bg-slate-200 text-slate-700", next: "Gold", nextPoints: 3000, discount: "10%" },
        gold: { color: "bg-yellow-100 text-yellow-700", next: "Platinum", nextPoints: 5000, discount: "15%" },
        platinum: { color: "bg-purple-100 text-purple-700", next: null, nextPoints: null, discount: "20%" },
    };

    const tier = tierInfo[profile?.tier] || tierInfo.bronze;
    const pointsToNext = tier.nextPoints ? tier.nextPoints - (profile?.points || 0) : 0;
    const progressPercent = tier.nextPoints
        ? Math.min(100, ((profile?.points || 0) / tier.nextPoints) * 100)
        : 100;

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <PageHeader title="My Profile" breadcrumb="Profile" />

            {/* Tier Card */}
            <Card className="mb-6 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-80">Current Tier</p>
                            <h2 className="text-3xl font-bold capitalize">{profile?.tier}</h2>
                            <p className="text-sm opacity-80 mt-1">Discount: {tier.discount}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm opacity-80">Points</p>
                            <p className="text-3xl font-bold">{profile?.points || 0}</p>
                        </div>
                    </div>
                    {tier.next && (
                        <div className="mt-4">
                            <div className="flex justify-between text-sm opacity-80 mb-1">
                                <span>Progress to {tier.next}</span>
                                <span>{Math.max(0, pointsToNext)} points to go</span>
                            </div>
                            <div className="w-full bg-white/30 rounded-full h-2">
                                <div
                                    className="bg-white rounded-full h-2 transition-all"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            {/* Profile Info */}
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        <MdPerson className="text-gray-400 text-xl" />
                        <div>
                            <p className="text-xs text-gray-400">Full Name</p>
                            <p className="font-medium">{profile?.full_name || "-"}</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                        <MdEmail className="text-gray-400 text-xl" />
                        <div>
                            <p className="text-xs text-gray-400">Email</p>
                            <p className="font-medium">{profile?.email || "-"}</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                        <MdPhone className="text-gray-400 text-xl" />
                        <div>
                            <p className="text-xs text-gray-400">Phone</p>
                            <p className="font-medium">{profile?.phone || "Not set"}</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                        <MdHome className="text-gray-400 text-xl" />
                        <div>
                            <p className="text-xs text-gray-400">Address</p>
                            <p className="font-medium">{profile?.address || "Not set"}</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                        <MdStar className="text-gray-400 text-xl" />
                        <div>
                            <p className="text-xs text-gray-400">Role</p>
                            <Badge variant={profile?.role === "admin" ? "default" : "secondary"} className="capitalize">
                                {profile?.role}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
