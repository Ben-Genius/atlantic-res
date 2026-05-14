import React from 'react'
import ServiceCard from '@/components/ServiceCard'

export default function TestPage() {
    return (
        <div className="min-h-screen bg-[#f8f9fa] py-20 px-5">
            <div className="container-xl mx-auto">
                <div className="max-w-2xl mb-16">
                    <h1 className="text-5xl font-bold font-display text-neutral-900 mb-6 uppercase tracking-tight">
                        Component <span className="text-[#67BA67]">Showcase</span>
                    </h1>
                    <p className="text-lg text-neutral-600">
                        Testing the new reusable ServiceCard component with the signature Atlantic notch design.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ServiceCard
                        title="Offshore Catering"
                        description="Premium culinary services for offshore rigs and vessels, maintaining the highest standards of safety and nutrition in challenging environments."
                        image="https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800"
                        tag="Logistics"
                    />
                    <ServiceCard
                        title="Corporate Events"
                        description="Exquisite catering solutions for high-end corporate events, galas, and executive meetings across West Africa."
                        image="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800"
                        tag="Events"
                    />
                    <ServiceCard
                        title="Industrial Cleaning"
                        description="Professional facility management and cleaning services tailored for industrial sites and remote camps."
                        image="https://images.unsplash.com/photo-1581578731522-af808871cc0?auto=format&fit=crop&q=80&w=800"
                        tag="Management"
                    />
                </div>
            </div>
        </div>
    )
}
