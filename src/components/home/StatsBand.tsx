import { stats } from '@/data/home'

export default function StatsBand() {
  return (
    <section className="bg-[#57C157] py-7">
      <div className="container-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/25">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center px-4 py-2">
              <div
                className="font-serif text-white leading-none font-bold"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)' }}
              >
                {value}
              </div>
              <div className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-white/75 mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
