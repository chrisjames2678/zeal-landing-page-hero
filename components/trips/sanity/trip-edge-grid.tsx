import { TripPortableText, TripPortableTextAutoBullets } from "./portable-text"
import type { SanityTrip } from "@/lib/sanity/types"

interface TripEdgeGridProps {
  trip: SanityTrip
}

function EdgeCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-[14px] border border-black/[0.06] bg-zeal-white p-[22px_24px]">
      <h3 className="mb-2.5 text-[16px] font-semibold text-zeal-black">{title}</h3>
      {children}
    </div>
  )
}

export function TripEdgeGrid({ trip }: TripEdgeGridProps) {
  const experts = trip.whoYouLearnFrom ?? []
  const hasPrivilegedAccess = (trip.privilegedAccess ?? []).length > 0
  const hasWhatYouDo = (trip.whatYouDo ?? []).length > 0
  const skills = trip.skillsAndTechniques ?? []
  const hasLeaveAbleTo = Boolean(trip.whatYoullLeaveAbleToDo) || skills.length > 0

  const hasAnyCard =
    experts.length > 0 || hasPrivilegedAccess || hasWhatYouDo || hasLeaveAbleTo
  if (!hasAnyCard) return null

  return (
    <section className="reveal mt-16">
      <h2 className="font-serif text-[27px] font-medium text-zeal-black">
        The Zeal edge
      </h2>
      <p className="mb-6 mt-1.5 max-w-[640px] text-[15px] text-zeal-mid">
        What separates this from an ordinary trip.
      </p>
      <div className="grid grid-cols-1 gap-7 min-[901px]:grid-cols-2">
        {experts.length > 0 && (
          <EdgeCard title="Who you learn from">
            <ul className="flex flex-col gap-3">
              {experts.map((expert, i) => (
                <li key={i} className="text-[14.5px]">
                  <b className="block text-[15px] font-semibold text-zeal-black">
                    {expert.name}
                  </b>
                  {expert.credentials && (
                    <span className="text-zeal-mid">{expert.credentials}</span>
                  )}
                </li>
              ))}
            </ul>
          </EdgeCard>
        )}

        {hasPrivilegedAccess && (
          <EdgeCard title="Privileged access">
            <TripPortableText value={trip.privilegedAccess} />
          </EdgeCard>
        )}

        {hasWhatYouDo && (
          <EdgeCard title="What you do">
            <TripPortableTextAutoBullets value={trip.whatYouDo} />
          </EdgeCard>
        )}

        {hasLeaveAbleTo && (
          <EdgeCard title="What you'll leave able to do">
            {trip.whatYoullLeaveAbleToDo && (
              <p className="text-[14.5px] leading-[1.6] text-zeal-mid">
                {trip.whatYoullLeaveAbleToDo}
              </p>
            )}
            {skills.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-zeal-accent/10 px-2.5 py-1 text-[12.5px] text-zeal-accent-hover"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </EdgeCard>
        )}
      </div>
    </section>
  )
}
