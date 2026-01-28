import React, { useState } from 'react';
import { SectionHeading, Button } from '../components/UIComponents';
import { Mail, Phone, MapPin, Linkedin, Send, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { PROFILE_INFO } from '../data';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // State to manage the form submission status
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error state when user starts typing again
    if (status === 'error') {
      setStatus('idle');
      setErrorMsg('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    
    // 1. Client-side Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    try {
      // 2. Submit to Formspree
      const response = await fetch("https://formspree.io/f/xwpgynaz", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' // Requests JSON response from Formspree
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // 3. Handle Success
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Reset form
        
        // Optional: Clear success message after 5 seconds to allow sending another
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        // 4. Handle Formspree Errors
        setStatus('error');
        if (data.errors && Array.isArray(data.errors)) {
          // Join multiple error messages if they exist
          setErrorMsg(data.errors.map((err: any) => err.message).join(", "));
        } else {
          setErrorMsg('Oops! There was a problem submitting your form.');
        }
      }
    } catch (err) {
      // 5. Handle Network Errors
      setStatus('error');
      setErrorMsg('Network error. Please check your internet connection.');
    }
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading title="Get In Touch" subtitle="Have a project in mind? Let's collaborate." />

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8 bg-surface p-8 rounded-2xl border border-white/5 h-fit">
          <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
          
          <div className="space-y-6">
            {/* Direct Email Action */}
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl mb-6">
               <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                 <Mail className="w-4 h-4" /> Prefer regular email?
               </h4>
               <p className="text-sm text-gray-400 mb-4">
                 You can also email me directly using your default mail client.
               </p>
               <a 
                 href={`mailto:${PROFILE_INFO.email}?subject=Project Inquiry`}
                 className="inline-flex items-center text-sm font-bold text-white bg-primary hover:bg-violet-600 px-4 py-2 rounded transition-colors"
               >
                 Send Email Directly <ArrowRight className="w-4 h-4 ml-2" />
               </a>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Phone</p>
                <p className="text-lg font-medium">{PROFILE_INFO.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Email</p>
                <p className="text-lg font-medium">{PROFILE_INFO.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">LinkedIn</p>
                <a href={PROFILE_INFO.linkedin} target="_blank" rel="noreferrer" className="text-lg font-medium text-secondary hover:underline">
                  View Profile
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Location</p>
                <p className="text-lg font-medium">Karachi, Pakistan (Available Remote)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-surface p-8 rounded-2xl border border-white/5 relative overflow-hidden">
          {/* Neon Glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                disabled={status === 'submitting' || status === 'success'}
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-background border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={status === 'submitting' || status === 'success'}
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-background border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                disabled={status === 'submitting' || status === 'success'}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-background border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Tell me about your project..."
              />
            </div>

            <Button 
              type="submit" 
              className="w-full group"
              disabled={status === 'submitting' || status === 'success'}
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
              {status !== 'submitting' && <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
            </Button>

            {/* Success Message */}
            {status === 'success' && (
              <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-start gap-3 text-green-400 animate-fadeInUp">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm">Message Sent!</p>
                  <p className="text-xs opacity-90">Thanks for reaching out. I'll get back to you soon.</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {status === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3 text-red-400 animate-fadeInUp">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm">Submission Failed</p>
                  <p className="text-xs opacity-90">{errorMsg}</p>
                </div>
              </div>
            )}
            
            <p className="text-xs text-gray-600 text-center mt-4">
              
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;