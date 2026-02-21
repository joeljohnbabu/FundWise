import { useState } from "react";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SellModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (propertyId: string, amount: number, duration: string) => void;
}

type Step = 'property' | 'amount' | 'duration' | 'preview';

const mockOwnedProperties = [
  { id: '1', name: 'Skyline Residency', totalInvested: 750000, currentPrice: 52000, originalPrice: 50000, currentValue: 780000 },
  { id: '2', name: 'Commercial Hub Tower', totalInvested: 600000, currentPrice: 78000, originalPrice: 75000, currentValue: 624000 },
  { id: '3', name: 'Green Valley Estate', totalInvested: 990000, currentPrice: 45000, originalPrice: 43000, currentValue: 1034880 },
];

export function SellModal({ open, onClose, onConfirm }: SellModalProps) {
  const [step, setStep] = useState<Step>('property');
  const [selectedProperty, setSelectedProperty] = useState<string>('');
  const [sellAmount, setSellAmount] = useState(10000);
  const [duration, setDuration] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedPropertyData = mockOwnedProperties.find(p => p.id === selectedProperty);
  const platformFee = sellAmount * 0.02; // 2% fee
  const netAmount = sellAmount - platformFee;

  const handleNext = () => {
    const steps: Step[] = ['property', 'amount', 'duration', 'preview'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: Step[] = ['property', 'amount', 'duration', 'preview'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      onConfirm(selectedProperty, sellAmount, duration);
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setStep('property');
    setSelectedProperty('');
    setSellAmount(10000);
    setDuration('');
    setIsProcessing(false);
    setIsSuccess(false);
    onClose();
  };

  const canProceed = () => {
    switch (step) {
      case 'property': return selectedProperty !== '';
      case 'amount': return sellAmount > 0 && selectedPropertyData && sellAmount <= selectedPropertyData.currentValue;
      case 'duration': return duration !== '';
      default: return true;
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="max-h-[90vh] p-0 rounded-t-3xl">
        <SheetTitle className="sr-only">Sell Shares</SheetTitle>
        <SheetDescription className="sr-only">
          Sell your shares in the marketplace. Select property, amount, and duration for your listing.
        </SheetDescription>

        {!isSuccess ? (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 p-6 border-b border-[#E5E7EB]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-[#0A0F1E]">Sell Shares</h3>
                  <p className="text-sm text-[#6B7280] mt-1">
                    Step {['property', 'amount', 'duration', 'preview'].indexOf(step) + 1} of 4
                  </p>
                </div>
                <button onClick={handleClose} className="p-2 hover:bg-[#F9FAFB] rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#00D9A3] transition-all duration-300"
                  style={{ width: `${((['property', 'amount', 'duration', 'preview'].indexOf(step) + 1) / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-2xl mx-auto">
                {step === 'property' && (
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-[#0A0F1E]">Select Property</label>
                    {mockOwnedProperties.map((property) => (
                      <div
                        key={property.id}
                        onClick={() => setSelectedProperty(property.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedProperty === property.id 
                            ? 'border-[#00D9A3] bg-[#00D9A3]/5' 
                            : 'border-[#E5E7EB] hover:border-[#00D9A3]/50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold text-[#0A0F1E]">{property.name}</div>
                            <div className="text-sm text-[#6B7280] mt-1">
                              Total Invested: ₹{(property.totalInvested / 1000).toFixed(0)}K
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-[#6B7280]">Current Value</div>
                            <div className="font-bold text-[#00D9A3]">
                              ₹{(property.currentValue / 1000).toFixed(0)}K
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {step === 'amount' && selectedPropertyData && (
                  <div className="space-y-5">
                    <div>
                      <label className="block mb-3 text-sm font-semibold text-[#0A0F1E]">Amount to Sell</label>
                      <p className="text-sm text-[#6B7280] mb-2">
                        Current portfolio value: ₹{selectedPropertyData.currentValue.toLocaleString('en-IN')}
                      </p>
                    </div>
                    
                    <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-[#6B7280]">Sell Amount</span>
                        <span className="font-bold text-[#00D9A3]" style={{ fontSize: '24px' }}>₹{sellAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <Slider 
                        value={[sellAmount]} 
                        onValueChange={(value) => setSellAmount(value[0])}
                        max={selectedPropertyData.currentValue} 
                        min={1000}
                        step={1000} 
                        className="mb-3"
                      />
                      <div className="flex justify-between text-xs text-[#6B7280]">
                        <span>₹1K</span>
                        <span>₹{(selectedPropertyData.currentValue / 1000).toFixed(0)}K</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-lg p-3 border border-[#E5E7EB]">
                        <div className="text-xs text-[#6B7280] mb-1">Original Price</div>
                        <div className="font-semibold text-[#0A0F1E]">₹{selectedPropertyData.originalPrice.toLocaleString('en-IN')}</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-[#E5E7EB]">
                        <div className="text-xs text-[#6B7280] mb-1">Market Price</div>
                        <div className="font-semibold text-[#00D9A3]">₹{selectedPropertyData.currentPrice.toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 'duration' && (
                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-[#0A0F1E]">Listing Duration</label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger className="h-12 rounded-lg border-2">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-day">1 Day</SelectItem>
                        <SelectItem value="3-days">3 Days</SelectItem>
                        <SelectItem value="7-days">7 Days</SelectItem>
                        <SelectItem value="14-days">14 Days</SelectItem>
                        <SelectItem value="30-days">30 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {step === 'preview' && selectedPropertyData && (
                  <div className="space-y-4">
                    <h4 className="text-base font-semibold text-[#0A0F1E] mb-4">Review Your Listing</h4>
                    <div className="bg-[#F9FAFB] rounded-lg p-4 space-y-3 border border-[#E5E7EB]">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#6B7280]">Property</span>
                        <span className="font-semibold text-[#0A0F1E]">{selectedPropertyData.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#6B7280]">Sell Amount</span>
                        <span className="font-semibold text-[#0A0F1E]">₹{sellAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#6B7280]">Duration</span>
                        <span className="font-semibold text-[#0A0F1E]">{duration.replace('-', ' ')}</span>
                      </div>
                      <div className="border-t border-[#E5E7EB] pt-3">
                        <div className="flex justify-between mb-2 text-sm">
                          <span className="text-[#6B7280]">Platform Fee (2%)</span>
                          <span className="font-semibold text-[#EF4444]">-₹{platformFee.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-[#E5E7EB]">
                          <span className="font-semibold text-[#0A0F1E]">You'll Receive</span>
                          <span className="font-bold text-[#10B981]" style={{ fontSize: '20px' }}>₹{netAmount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Fixed Bottom CTA */}
            <div className="flex-shrink-0 p-6 border-t border-[#E5E7EB] bg-white flex gap-3">
              {step !== 'property' && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 h-12 rounded-full border-2"
                >
                  Back
                </Button>
              )}
              <Button
                onClick={step === 'preview' ? handleConfirm : handleNext}
                disabled={!canProceed() || isProcessing}
                className="flex-1 h-12 bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-full font-semibold disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF]"
              >
                {isProcessing ? 'Processing...' : step === 'preview' ? 'List for Sale' : 'Next'}
                {step !== 'preview' && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center p-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#00D9A3]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-[#00D9A3]" />
              </div>
              <h3 className="font-bold text-[#0A0F1E] mb-2" style={{ fontSize: '24px' }}>Listing Created!</h3>
              <p className="text-[#6B7280] mb-6">
                Your shares worth ₹{sellAmount.toLocaleString('en-IN')} are now listed for sale
              </p>
              <Button
                onClick={handleClose}
                className="bg-[#00D9A3] hover:bg-[#00C293] text-white rounded-full px-8 font-semibold"
              >
                View My Listings
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
