import { Shield, TrendingUp, FileText, DollarSign } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "SEBI Regulated",
    description: "All properties are compliant with regulatory standards, ensuring investor protection and transparency.",
  },
  {
    icon: TrendingUp,
    title: "High Returns",
    description: "Earn 8-15% annual returns through rental income and property appreciation.",
  },
  {
    icon: FileText,
    title: "Complete Transparency",
    description: "Access detailed property documents, valuations, and performance reports anytime.",
  },
  {
    icon: DollarSign,
    title: "Low Minimum Investment",
    description: "Start investing in premium real estate from just ₹10,000 with fractional ownership.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container-stake">
        <div className="text-center mb-16">
          <h2 className="mb-4">Why invest with fundwise?</h2>
          <p className="text-body-lg text-[#6B7280] max-w-2xl mx-auto">
            Democratizing real estate investment with technology and transparency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-[#E5E7EB] hover:border-[#00D9A3] transition-all hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-[#00D9A3]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#00D9A3] transition-colors">
                <feature.icon className="w-6 h-6 text-[#00D9A3] group-hover:text-white transition-colors" />
              </div>
              <h4 className="mb-2">{feature.title}</h4>
              <p className="text-body-sm text-[#6B7280]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
