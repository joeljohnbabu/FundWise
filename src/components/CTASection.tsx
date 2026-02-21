import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#00D9A3] to-[#00C293] relative overflow-hidden">
      <div className="container-stake relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="mb-6 text-white">
            Start building wealth through real estate
          </h2>
          <p className="text-xl mb-10 text-white/90">
            Join thousands of investors who are earning passive income through fractional real estate ownership.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-white text-[#00D9A3] hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-semibold shadow-xl">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-8 py-6 text-lg font-semibold border-2 border-white text-white hover:bg-white/10"
            >
              Schedule a Call
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
    </section>
  );
}
