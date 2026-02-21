import { X, MapPin, TrendingUp, FileText, Download } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface PropertyDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  property: {
    id: string;
    title: string;
    location: string;
    roi: number;
    price: number;
    image: string;
    appreciation: number;
    rentalYield: number;
  } | null;
  onBuy: (id: string) => void;
}

// Mock data
const priceHistoryData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  price: 45000 + Math.random() * 15000,
}));

const listingsData = [
  { seller: 'S-1234', qty: 5, price: 52000, timeRemaining: '2d 5h' },
  { seller: 'S-5678', qty: 10, price: 52500, timeRemaining: '4d 12h' },
  { seller: 'S-9012', qty: 3, price: 53000, timeRemaining: '1d 3h' },
  { seller: 'S-3456', qty: 8, price: 53200, timeRemaining: '5d 18h' },
];

const documents = [
  { name: 'Property Deed', type: 'PDF', size: '2.4 MB' },
  { name: 'Valuation Report', type: 'PDF', size: '1.8 MB' },
  { name: 'Inspection Certificate', type: 'PDF', size: '3.1 MB' },
  { name: 'Legal Documents', type: 'PDF', size: '4.5 MB' },
];

export function PropertyDetailDrawer({ open, onClose, property, onBuy }: PropertyDetailDrawerProps) {
  if (!property) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[720px] p-0 overflow-y-auto">
        <SheetHeader className="sticky top-0 bg-white z-10 p-6 border-b border-[#EEEEEE] flex flex-row items-center justify-between">
          <SheetTitle className="sr-only">{property.title}</SheetTitle>
          <SheetDescription className="sr-only">
            Property details for {property.title} located in {property.location}
          </SheetDescription>
          <div className="flex-1">
            <h2 style={{ fontSize: '20pt', fontWeight: '700', color: '#1E3D34' }}>{property.title}</h2>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4" style={{ color: '#BDBDBD' }} />
              <span className="text-body" style={{ color: '#6B7280' }}>{property.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => onBuy(property.id)}
              className="bg-[#C5A572] hover:bg-[#B59562] text-white rounded-full px-6"
              style={{ fontSize: '14pt', fontWeight: '500' }}
            >
              Buy Now
            </Button>
            <button onClick={onClose} className="p-2 hover:bg-[#FAFAFA] rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </SheetHeader>

        <Tabs defaultValue="overview" className="p-6">
          <TabsList className="w-full bg-[#FAFAFA] p-1 rounded-lg mb-6">
            <TabsTrigger value="overview" className="flex-1 data-[state=active]:bg-white">Overview</TabsTrigger>
            <TabsTrigger value="listings" className="flex-1 data-[state=active]:bg-white">Listings</TabsTrigger>
            <TabsTrigger value="history" className="flex-1 data-[state=active]:bg-white">Price History</TabsTrigger>
            <TabsTrigger value="documents" className="flex-1 data-[state=active]:bg-white">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-0">
            {/* Image Carousel */}
            <div className="rounded-2xl overflow-hidden aspect-[16/9]">
              <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#FAFAFA] rounded-xl p-4 border border-[#EEEEEE]">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4" style={{ color: '#16A34A' }} />
                  <span className="text-caption" style={{ color: '#6B7280' }}>ROI</span>
                </div>
                <div style={{ fontSize: '20pt', fontWeight: '700', color: '#16A34A' }}>{property.roi}%</div>
              </div>
              <div className="bg-[#FAFAFA] rounded-xl p-4 border border-[#EEEEEE]">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4" style={{ color: '#C5A572' }} />
                  <span className="text-caption" style={{ color: '#6B7280' }}>Appreciation</span>
                </div>
                <div style={{ fontSize: '20pt', fontWeight: '700', color: '#1E3D34' }}>{property.appreciation}%</div>
              </div>
              <div className="bg-[#FAFAFA] rounded-xl p-4 border border-[#EEEEEE]">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4" style={{ color: '#3B82F6' }} />
                  <span className="text-caption" style={{ color: '#6B7280' }}>Rental Yield</span>
                </div>
                <div style={{ fontSize: '20pt', fontWeight: '700', color: '#1E3D34' }}>{property.rentalYield}%</div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="mb-3" style={{ fontSize: '16pt', fontWeight: '600', color: '#1E3D34' }}>About Property</h3>
              <p className="text-body" style={{ color: '#6B7280', lineHeight: '1.7' }}>
                Prime commercial property located in the heart of the business district. This asset offers excellent rental yields and strong appreciation potential. The property features modern amenities, high-quality construction, and is fully occupied by reputable tenants.
              </p>
            </div>

            {/* Map */}
            <div className="bg-[#FAFAFA] rounded-xl p-4 border border-[#EEEEEE] h-48 flex items-center justify-center">
              <span className="text-body" style={{ color: '#BDBDBD' }}>Map View</span>
            </div>
          </TabsContent>

          <TabsContent value="listings" className="mt-0">
            <div className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Seller ID</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price/Fraction</TableHead>
                    <TableHead>Time Left</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listingsData.map((listing) => (
                    <TableRow key={listing.seller}>
                      <TableCell className="text-medium">{listing.seller}</TableCell>
                      <TableCell>{listing.qty} fractions</TableCell>
                      <TableCell style={{ fontWeight: '600', color: '#1E3D34' }}>₹{listing.price.toLocaleString('en-IN')}</TableCell>
                      <TableCell style={{ color: '#6B7280' }}>{listing.timeRemaining}</TableCell>
                      <TableCell>
                        <Button size="sm" className="bg-[#C5A572] hover:bg-[#B59562] text-white rounded-full">
                          Buy
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <div className="bg-white rounded-xl border border-[#EEEEEE] p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceHistoryData}>
                    <XAxis dataKey="day" stroke="#BDBDBD" />
                    <YAxis stroke="#BDBDBD" />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#C5A572" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-0 space-y-3">
            {documents.map((doc) => (
              <div key={doc.name} className="bg-white rounded-xl border border-[#EEEEEE] p-4 flex items-center justify-between hover:border-[#C5A572] transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FAFAFA] rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5" style={{ color: '#C5A572' }} />
                  </div>
                  <div>
                    <div className="text-medium" style={{ color: '#1E3D34' }}>{doc.name}</div>
                    <div className="text-caption" style={{ color: '#BDBDBD' }}>{doc.type} · {doc.size}</div>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-[#C5A572] hover:text-[#B59562]">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
