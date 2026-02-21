import { useState, useEffect } from "react";
import { FundwiseHeader } from "./components/StakeHeader";
import { HeroSectionWithSearch } from "./components/HeroSectionWithSearch";
import { FeaturesSection } from "./components/FeaturesSection";
import { StakePropertyCard } from "./components/StakePropertyCard";
import { StatsSection } from "./components/StatsSection";
import { CTASection } from "./components/CTASection";
import { FundwiseFooter } from "./components/StakeFooter";
import { SecondaryMarketplace } from "./components/SecondaryMarketplace";
import { SearchResults } from "./components/SearchResults";
import { Portfolio } from "./components/Portfolio";
import { Wallet } from "./components/Wallet";
import { Profile } from "./components/Profile";
import { AuthDrawer } from "./components/AuthDrawer";
import { BottomNav } from "./components/BottomNav";
import { BuyModal } from "./components/BuyModal";
import { SellModal } from "./components/SellModal";
import { PropertyDetailDrawer } from "./components/PropertyDetailDrawer";
import { PropertyDetail } from "./components/PropertyDetail";
import { AdminPage } from "./components/AdminPage";
import { Toaster, toast } from "sonner";

export default function App() {
  console.log("App component is loading...");
  const [primaryProperties, setPrimaryProperties] = useState<any[]>([]);
  const [secondaryProperties, setSecondaryProperties] = useState<any[]>([]);
  const [yourListings, setYourListings] = useState<any[]>([]);
  const [portfolioProperties, setPortfolioProperties] = useState<any[]>([]);
  const [portfolioSummary, setPortfolioSummary] = useState<any>({
    networth: 0,
    invested: 0,
    returns: 0,
    rentEarned: 0,
    walletBalance: 0,
  });
  const [walletTransactions, setWalletTransactions] = useState<any[]>([]);

  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [detailPageOpen, setDetailPageOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [buyModalProperty, setBuyModalProperty] = useState<any>(null);
  const [isSignedIn, setIsSignedIn] = useState(false); // Authentication state
  const [userRole, setUserRole] = useState<'user' | 'admin'>('user');
  const [authModalOpen, setAuthModalOpen] = useState(false); // Auth modal state

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [primaryRes, secondaryRes, listingsRes, portfolioRes, walletRes] = await Promise.all([
          fetch('http://localhost:5001/api/properties/primary'),
          fetch('http://localhost:5001/api/properties/secondary'),
          fetch('http://localhost:5001/api/user/listings'),
          fetch('http://localhost:5001/api/portfolio'),
          fetch('http://localhost:5001/api/wallet/transactions')
        ]);

        const primaryData = await primaryRes.json();
        const secondaryData = await secondaryRes.json();
        const listingsData = await listingsRes.json();
        const portfolioData = await portfolioRes.json();
        const walletData = await walletRes.json();

        setPrimaryProperties(primaryData);
        setSecondaryProperties(secondaryData);
        setYourListings(listingsData);
        setPortfolioProperties(portfolioData.properties);
        setPortfolioSummary(portfolioData.summary);
        setWalletTransactions(walletData);
        console.log("Data fetched successfully");
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to connect to backend", {
          description: "Please make sure the backend server is running."
        });
      }
    };

    fetchData();
  }, []);

  const handlePropertyClick = (id: string) => {
    console.log("Property clicked:", id);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveSection('search');
  };

  const handleBuy = (propertyId: string) => {
    const allProperties = [...primaryProperties, ...secondaryProperties];
    const property = allProperties.find(p => p.id === propertyId);
    if (property) {
      setBuyModalProperty(property);
      setBuyModalOpen(true);
    }
  };

  const handleViewDetails = (propertyId: string) => {
    const allProperties = [...primaryProperties, ...secondaryProperties, ...portfolioProperties];
    const property = allProperties.find(p => p.id === propertyId);
    if (property) {
      setSelectedProperty({
        ...property,
        totalValue: (property as any).totalValue || (property as any).currentValue * 10 || 5000000,
        fundedPercentage: (property as any).fundedPercentage || 74,
        availableAmount: (property as any).sellerAmount || (property as any).minInvestment * 20 || 500000,
        beds: 2,
        baths: 2,
        sqft: 758,
        yearBuilt: 2022,
        propertyType: (property as any).type || "residential",
      });
      setDetailPageOpen(true);
    }
  };

  const handleBuyConfirm = (_propertyId: string, amount: number) => {
    toast.success('Purchase successful!', {
      description: `You've invested ₹${amount.toLocaleString('en-IN')}`,
    });
    setBuyModalOpen(false);
    setBuyModalProperty(null);
  };

  const handleSellConfirm = (_propertyId: string, amount: number, _duration: string) => {
    toast.success('Listing created!', {
      description: `Your shares worth ₹${amount.toLocaleString('en-IN')} are now listed for sale`,
    });
    setSellModalOpen(false);
  };

  const handleSellFromPortfolio = (propertyId: string) => {
    setSellModalOpen(true);
  };

  const handleBuyMoreFromPortfolio = (propertyId: string) => {
    const property = portfolioProperties.find(p => p.id === propertyId);
    if (property) {
      setBuyModalProperty(property);
      setBuyModalOpen(true);
    }
  };

  // Show Admin Page if logged in as admin
  if (isSignedIn && userRole === 'admin') {
    return <AdminPage onSignOut={() => setIsSignedIn(false)} />
  }

  // Show PropertyDetail page if open
  if (detailPageOpen && selectedProperty) {
    return (
      <>
        <PropertyDetail
          property={selectedProperty}
          onBack={() => {
            setDetailPageOpen(false);
            setSelectedProperty(null);
          }}
          onBuy={handleBuy}
        />

        {/* Modals */}
        <BuyModal
          open={buyModalOpen}
          onClose={() => setBuyModalOpen(false)}
          property={buyModalProperty}
          onConfirm={handleBuyConfirm}
          onViewDetails={handleViewDetails}
        />

        {/* Toast Notifications */}
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
      </>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <FundwiseHeader
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onSearch={(query) => handleSearch(query)}
        isSignedIn={isSignedIn}
        onSignIn={() => setAuthModalOpen(true)}
      />

      {/* Conditional Rendering based on active section */}
      {activeSection === 'home' ? (
        <>
          {/* Hero Section */}
          <HeroSectionWithSearch onSearch={handleSearch} />

          {/* Featured Properties */}
          <section className="py-24 bg-white px-[0px] py-[50px]">
            <div className="container-stake">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="mb-3">Featured Properties</h2>
                  <p className="text-body-lg text-[#6B7280]">
                    Hand-picked investment opportunities with high return potential
                  </p>
                </div>
                <button className="text-[#00D9A3] font-semibold hover:underline hidden lg:block">
                  View All Properties →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {primaryProperties.map((property) => (
                  <StakePropertyCard
                    key={property.id}
                    {...property}
                    onClick={handlePropertyClick}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>

              <div className="text-center mt-12 lg:hidden">
                <button className="text-[#00D9A3] font-semibold hover:underline">
                  View All Properties →
                </button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <FeaturesSection />

          {/* How It Works */}
          <section className="py-24 bg-white">
            <div className="container-stake">
              <div className="text-center mb-16">
                <h2 className="mb-4">How it works</h2>
                <p className="text-body-lg text-[#6B7280] max-w-2xl mx-auto">
                  Start investing in real estate in three simple steps
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#00D9A3]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-[#00D9A3]">1</span>
                  </div>
                  <h4 className="mb-3">Browse Properties</h4>
                  <p className="text-body-sm text-[#6B7280]">
                    Explore our curated selection of verified premium properties with detailed information and expected returns.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#00D9A3]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-[#00D9A3]">2</span>
                  </div>
                  <h4 className="mb-3">Invest</h4>
                  <p className="text-body-sm text-[#6B7280]">
                    Choose your investment amount starting from ₹10,000 and complete KYC. Your investment is secured immediately.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-[#00D9A3]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-[#00D9A3]">3</span>
                  </div>
                  <h4 className="mb-3">Earn Returns</h4>
                  <p className="text-body-sm text-[#6B7280]">
                    Receive quarterly rental income and benefit from property appreciation. Track everything in your dashboard.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <CTASection />
        </>
      ) : activeSection === 'search' ? (
        <SearchResults
          searchQuery={searchQuery}
          primaryProperties={primaryProperties}
          secondaryProperties={secondaryProperties}
          onPropertyClick={handlePropertyClick}
          onBuy={handleBuy}
          onViewDetails={handleViewDetails}
          onSearch={handleSearch}
        />
      ) : activeSection === 'marketplace' ? (
        <SecondaryMarketplace
          availableProperties={secondaryProperties}
          yourListings={yourListings}
          onViewDetails={handleViewDetails}
        />
      ) : activeSection === 'portfolio' ? (
        <Portfolio
          summary={portfolioSummary}
          properties={portfolioProperties}
          onSell={handleSellFromPortfolio}
          onBuyMore={handleBuyMoreFromPortfolio}
          onViewDetails={handleViewDetails}
          onNavigateToWallet={() => setActiveSection('wallet')}
        />
      ) : activeSection === 'wallet' ? (
        <Wallet
          balance={portfolioSummary.walletBalance}
          totalInvested={portfolioSummary.invested}
          pendingReturns={portfolioSummary.returns}
          transactions={walletTransactions}
        />
      ) : activeSection === 'profile' ? (
        <Profile
          onBack={() => setActiveSection('marketplace')}
          isSignedIn={isSignedIn}
          onSignOut={() => setIsSignedIn(false)}
          onSignIn={() => setAuthModalOpen(true)}
        />
      ) : null}

      {/* Footer */}
      <div className="pb-24 lg:pb-0">
        <FundwiseFooter />
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNav
        activeSection={activeSection}
        onNavigate={(section) => setActiveSection(section)}
        isSignedIn={isSignedIn}
      />

      {/* Modals & Drawers */}
      <BuyModal
        open={buyModalOpen}
        onClose={() => setBuyModalOpen(false)}
        property={buyModalProperty}
        onConfirm={handleBuyConfirm}
        onViewDetails={handleViewDetails}
      />

      <SellModal
        open={sellModalOpen}
        onClose={() => setSellModalOpen(false)}
        onConfirm={handleSellConfirm}
      />

      <PropertyDetailDrawer
        open={detailDrawerOpen}
        onClose={() => setDetailDrawerOpen(false)}
        property={selectedProperty}
        onBuy={handleBuy}
      />

      {/* Auth Drawer */}
      <AuthDrawer
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSignIn={(role) => {
          setIsSignedIn(true);
          setUserRole(role);
          toast.success(`Welcome back! Signed in as ${role}`);
        }}
      />

      {/* Toast Notifications */}
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
