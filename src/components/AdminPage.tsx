import { useState, useEffect } from "react";
import {
    Users,
    DollarSign,
    Building2,
    TrendingUp,
    LogOut,
    Trash2,
    Plus
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Toaster, toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";

interface AdminPageProps {
    onSignOut: () => void;
}

export function AdminPage({ onSignOut }: AdminPageProps) {
    const [stats, setStats] = useState<any>(null);
    const [properties, setProperties] = useState<any[]>([]);
    const [newProperty, setNewProperty] = useState({
        title: "",
        location: "",
        minInvestment: 0,
        expectedReturn: 0
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const fetchStats = async () => {
        try {
            const res = await fetch('http://localhost:5001/api/admin/stats');
            const data = await res.json();
            setStats(data);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };

    const fetchProperties = async () => {
        try {
            const res = await fetch('http://localhost:5001/api/admin/properties');
            const data = await res.json();
            setProperties(data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    useEffect(() => {
        fetchStats();
        fetchProperties();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:5001/api/admin/properties/${id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                toast.success("Property deleted successfully");
                fetchProperties();
                fetchStats();
            } else {
                toast.error("Failed to delete property");
            }
        } catch (error) {
            console.error("Error deleting property:", error);
        }
    };

    const handleAddProperty = async () => {
        try {
            const res = await fetch('http://localhost:5001/api/admin/properties', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newProperty,
                    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tZXJjaWFsJTIwYnVpbGRpbmclMjBleHRlcmlvcnxlbnwxfHx8fDE3NjA1NTY4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080", // Default image
                    type: "Commercial",
                    rentalYield: 5.5,
                    roi: newProperty.expectedReturn,
                    totalValue: 10000000,
                    timeLeft: "30 days",
                    featured: true
                })
            });

            if (res.ok) {
                toast.success("Property added successfully");
                setIsDialogOpen(false);
                setNewProperty({ title: "", location: "", minInvestment: 0, expectedReturn: 0, category: "Primary" });
                fetchProperties();
                fetchStats();
            } else {
                toast.error("Failed to add property");
            }
        } catch (error) {
            console.error("Error adding property:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-8 h-8 bg-[#00D9A3] rounded-lg"></div>
                        <h1 className="font-bold text-xl text-[#0A0F1E]">FundWise <span className="text-xs text-gray-500 font-normal">Admin</span></h1>
                    </div>

                    <nav className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start bg-gray-100 font-medium">
                            <TrendingUp className="w-5 h-5 mr-3 text-[#00D9A3]" />
                            Dashboard
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-gray-600">
                            <Users className="w-5 h-5 mr-3" />
                            Users
                        </Button>
                        <Button variant="ghost" className="w-full justify-start text-gray-600">
                            <Building2 className="w-5 h-5 mr-3" />
                            Properties
                        </Button>
                    </nav>
                </div>

                <Button
                    variant="outline"
                    className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={onSignOut}
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                </Button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto h-screen">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-[#0A0F1E]">Dashboard Overview</h2>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">AD</div>
                        <div>
                            <div className="font-medium text-[#0A0F1E]">Admin User</div>
                            <div className="text-xs text-gray-500">Super Admin</div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-500 text-sm font-medium">Total Users</span>
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                <Users className="w-4 h-4 text-blue-500" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-[#0A0F1E]">{(stats?.totalUsers || 0).toLocaleString()}</div>
                        <div className="text-xs text-green-500 mt-1 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" /> +12% this month
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-500 text-sm font-medium">Total Investment</span>
                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                                <DollarSign className="w-4 h-4 text-[#00D9A3]" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-[#0A0F1E]">₹{(stats?.totalInvestment || 0).toLocaleString()}</div>
                        <div className="text-xs text-green-500 mt-1 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" /> +5.4% this month
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-500 text-sm font-medium">Active Properties</span>
                            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                                <Building2 className="w-4 h-4 text-orange-500" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-[#0A0F1E]">{stats?.activeProperties || 0}</div>
                        <div className="text-xs text-gray-400 mt-1">Live listings</div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-500 text-sm font-medium">Platform Revenue</span>
                            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                                <DollarSign className="w-4 h-4 text-purple-500" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-[#0A0F1E]">₹{(stats?.platformRevenue || 0).toLocaleString()}</div>
                    </div>
                </div>

                {/* Properties Management */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg text-[#0A0F1E]">Manage Properties</h3>

                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-[#00D9A3] hover:bg-[#00C293] text-white">
                                    <Plus className="w-4 h-4 mr-2" /> Add Property
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Property</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 pt-4">
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Property Title</label>
                                        <Input
                                            value={newProperty.title}
                                            onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                                            placeholder="e.g. Skyline Towers"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Location</label>
                                        <Input
                                            value={newProperty.location}
                                            onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                                            placeholder="e.g. Mumbai, India"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Category</label>
                                        <select
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={(newProperty as any).category || 'Primary'}
                                            onChange={(e) => setNewProperty({ ...newProperty, category: e.target.value } as any)}
                                        >
                                            <option value="Primary">Primary Market</option>
                                            <option value="Secondary">Secondary Market (Resale)</option>
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium mb-1 block">Min Investment (₹)</label>
                                            <Input
                                                type="number"
                                                value={newProperty.minInvestment}
                                                onChange={(e) => setNewProperty({ ...newProperty, minInvestment: Number(e.target.value) })}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-1 block">Expected Return (%)</label>
                                            <Input
                                                type="number"
                                                value={newProperty.expectedReturn}
                                                onChange={(e) => setNewProperty({ ...newProperty, expectedReturn: Number(e.target.value) })}
                                            />
                                        </div>
                                    </div>
                                    <Button onClick={handleAddProperty} className="w-full bg-[#00D9A3] hover:bg-[#00C293] mt-4">
                                        Create Property
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Title</th>
                                    <th className="px-4 py-3">Location</th>
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Funded</th>
                                    <th className="px-4 py-3 text-right rounded-r-lg">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {properties.map((property: any) => (
                                    <tr key={property.id} className="group hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-[#0A0F1E] flex items-center gap-3">
                                            <img src={property.image} className="w-8 h-8 rounded-md object-cover" alt="" />
                                            {property.title}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{property.location}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${property.category === 'Primary' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                                                {property.category || 'Primary'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#00D9A3]" style={{ width: `${property.fundedPercentage || 0}%` }}></div>
                                                </div>
                                                <span>{property.fundedPercentage || 0}%</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-red-400 hover:text-red-500 hover:bg-red-50"
                                                onClick={() => handleDelete(property.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Toaster
                position="top-right"
                richColors
                closeButton
                toastOptions={{
                    style: {
                        fontFamily: 'Inter',
                    },
                }}
            />
        </div>
    );
}
