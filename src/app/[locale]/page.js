'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, Clock, MapPin, Users, Building2, 
  ArrowRight, Sparkles, Shield
} from "lucide-react";
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Home() {
  const t = useTranslations('HomePage');
  const tNav = useTranslations('Navigation');

  const features = [
    {
      icon: Calendar,
      title: t('feature1Title'),
      description: t('feature1Desc')
    },
    {
      icon: MapPin,
      title: t('feature2Title'),
      description: t('feature2Desc')
    },
    {
      icon: Users,
      title: t('feature3Title'),
      description: t('feature3Desc')
    },
    {
      icon: Shield,
      title: t('feature4Title'),
      description: t('feature4Desc')
    }
  ];

  const steps = [
    {
      step: '01',
      title: t('step1Title'),
      description: t('step1Desc')
    },
    {
      step: '02',
      title: t('step2Title'),
      description: t('step2Desc')
    },
    {
      step: '03',
      title: t('step3Title'),
      description: t('step3Desc')
    }
  ];

  const travelItems = [
    { label: t('travelLabel1'), value: t('travelValue1') },
    { label: t('travelLabel2'), value: t('travelValue2') },
    { label: t('travelLabel3'), value: t('travelValue3') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920')] bg-cover bg-center opacity-10" />
        
        <nav className="relative z-10 max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">BookFlow</span>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link href="/book">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  {tNav('bookNow')}
                </Button>
              </Link>
              <Link href="/admin-dashboard">
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                  {tNav('dashboard')}
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 lg:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              {t('badge')}
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t('title')}
              <span className="text-emerald-400">{t('titleHighlight')}</span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {t('subtitle')}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/book">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-lg px-8">
                  {t('bookService')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/company-setup">
                <Button size="lg" variant="outline" className="text-lg px-8 border-white/20 text-white hover:bg-white/10">
                  {t('registerBusiness')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              {t('featuresTitle')}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('featuresSubtitle')}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              {t('howItWorksTitle')}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Time Explanation */}
      <section className="py-24 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Clock className="w-16 h-16 text-emerald-200 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-6">
            {t('travelTitle')}
          </h2>
          <p className="text-xl text-emerald-100 leading-relaxed mb-8">
            {t('travelDesc')}
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {travelItems.map((item) => (
              <div key={item.label} className="bg-white/10 rounded-xl p-4">
                <p className="text-emerald-200 text-sm mb-1">{item.label}</p>
                <p className="text-white font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            {t('ctaSubtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/company-setup">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-lg px-8">
                <Building2 className="w-5 h-5 mr-2" />
                {t('createCompany')}
              </Button>
            </Link>
            <Link href="/book">
              <Button size="lg" variant="outline" className="text-lg px-8 border-white/20 text-white hover:bg-white/10">
                {t('viewDemo')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">BookFlow</span>
            </div>
            
            <div className="flex gap-6 text-sm text-slate-400">
              <Link href="/book" className="hover:text-white transition-colors">
                {tNav('bookNow')}
              </Link>
              <Link href="/admin-dashboard" className="hover:text-white transition-colors">
                {tNav('adminDashboard')}
              </Link>
              <Link href="/employee-calendar" className="hover:text-white transition-colors">
                {tNav('employeePortal')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}