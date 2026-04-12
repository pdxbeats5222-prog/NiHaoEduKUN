import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-4">Get Your Place.</h1>
        <p className="text-xl text-[#86868b] max-w-2xl mx-auto">Ready to start your journey? Let's talk.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-[#1d1d1f] mb-4">Contact Information</h3>
            <div className="space-y-4 text-[#86868b]">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#1d1d1f]" />
                <span>+86 15968141445</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#1d1d1f]" />
                <a href="mailto:nihaoedu@gmail.com" className="hover:text-[#0071e3] transition-colors">nihaoedu@gmail.com</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#1d1d1f] shrink-0 mt-1" />
                <span>Block A, Xipei Education Building, 280 Xuelin St, Xiasha Higher Education Zone, Hangzhou, Zhejiang</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-[#f5f5f7] p-8 md:p-10 rounded-[2rem]">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#1d1d1f] mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1d1d1f] mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow" placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1d1d1f] mb-2">What are you looking for?</label>
              <select className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow text-[#1d1d1f]">
                <option>University Admissions</option>
                <option>Language Programs</option>
                <option>Visa Assistance</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1d1d1f] mb-2">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-[#0071e3] outline-none transition-shadow resize-none" placeholder="Tell us about your goals..."></textarea>
            </div>
            <button type="submit" className="w-full bg-[#0071e3] text-white font-medium py-4 rounded-full hover:bg-[#0077ed] transition-colors text-lg">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
