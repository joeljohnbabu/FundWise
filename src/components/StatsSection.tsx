export function StatsSection() {
  const stats = [
    {
      value: "₹500Cr+",
      label: "Assets under management",
      subtext: "Across 50+ premium properties",
    },
    {
      value: "25,000+",
      label: "Happy investors",
      subtext: "Growing community of smart investors",
    },
    {
      value: "12.5%",
      label: "Average returns",
      subtext: "Consistently outperforming traditional assets",
    },
    {
      value: "100%",
      label: "Transparency",
      subtext: "Complete visibility into your investments",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#0A0F1E] to-[#1A1F2E] text-white">
      <div className="container-stake">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-white">Trusted by thousands of investors</h2>
          <p className="text-body-lg text-[#9CA3AF] max-w-2xl mx-auto">
            Join India's fastest growing real estate investment platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-[#00D9A3] to-[#00FFB8] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xl font-semibold mb-2">{stat.label}</div>
              <div className="text-sm text-[#9CA3AF]">{stat.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
