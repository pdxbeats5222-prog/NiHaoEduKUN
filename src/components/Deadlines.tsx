import { motion } from 'motion/react';
import { Calendar, Bell, ArrowRight } from 'lucide-react';

interface Deadline {
  id: number;
  title: string;
  type: string;
  date: string;
  description: string;
}

const deadlines: Deadline[] = [
  {
    id: 1,
    title: "Chinese Government Scholarship (CSC)",
    type: "Scholarship",
    date: "2026-02-28",
    description: "Full scholarship covering tuition, accommodation, and living stipend for international students.",
  },
  {
    id: 2,
    title: "Zhejiang University Fall Intake",
    type: "University Admission",
    date: "2026-03-15",
    description: "Application deadline for Bachelor's and Master's programs starting in September 2026.",
  },
  {
    id: 3,
    title: "Hangzhou Normal University Spring Intake",
    type: "University Admission",
    date: "2026-05-30",
    description: "Language program (HSK) applications for the upcoming Spring semester.",
  },
  {
    id: 4,
    title: "Zhejiang Provincial Government Scholarship",
    type: "Scholarship",
    date: "2026-04-30",
    description: "Partial and full scholarships for outstanding international students in Zhejiang province.",
  }
];

export default function Deadlines() {
  const handleSetReminder = (deadline: Deadline) => {
    // Generate an ICS file for calendar reminder
    const startDate = deadline.date.replace(/-/g, '');
    const endDate = startDate; // All day event
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART;VALUE=DATE:${startDate}
DTEND;VALUE=DATE:${endDate}
SUMMARY:Deadline: ${deadline.title}
DESCRIPTION:${deadline.description}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `deadline-${deadline.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-red-400/10 to-transparent blur-3xl rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-4">Upcoming Deadlines.</h2>
          <p className="text-xl text-[#5a5a5c] max-w-2xl mx-auto">
            Stay on top of your application schedule. Never miss an opportunity for admission or scholarships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {deadlines.map((deadline, idx) => (
            <motion.div 
              key={deadline.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-[#faf9f6] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 rounded-[2rem] flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between group hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500"
            >
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase tracking-wider">
                    {deadline.type}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors">{deadline.title}</h3>
                <div className="flex items-center gap-2 text-[#5a5a5c] mb-4">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  <span className="font-medium">{new Date(deadline.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <p className="text-[#5a5a5c] leading-relaxed">{deadline.description}</p>
              </div>
              
              <button 
                onClick={() => handleSetReminder(deadline)}
                className="shrink-0 bg-white text-[#1d1d1f] hover:text-red-600 p-4 rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-red-500 group-hover:text-white"
                title="Add to Calendar"
              >
                <Bell className="w-6 h-6" />
                <span className="sm:hidden font-medium">Set Reminder</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
