"use client";

import { BASE_SKILLS } from "@/lib/constsants/skills";

type Character = {
  name: string;
  occupation: string;
  age: number | null;
  residence: string | null;
  birthplace: string | null;

  HP: number;
  maxHP: number;

  MP: number;
  maxMP: number;

  sanity: number;
  luck: number;
  moveRate: number;

  mjWound: boolean;

  characteristics: Record<string, number>;
  skills: Record<string, number>;
};

interface Props {
  character: Character;
}

export default function InvestigatorSheet({ character }: Props) {
  const topSkills = Object.entries(character.skills).sort(
    ([, a], [, b]) => b - a,
  );

  return (
    <div className="flex justify-center grow">

    <div className="sheet">
      <h1>1920s Era Investigator</h1>

      <section className="basic-info">
        <div>
          <strong>Name:</strong> {character.name}
        </div>

        <div>
          <strong>Occupation:</strong> {character.occupation}
        </div>

        <div>
          <strong>Age:</strong> {character.age ?? "-"}
        </div>

        <div>
          <strong>Residence:</strong> {character.residence ?? "-"}
        </div>

        <div>
          <strong>Birthplace:</strong> {character.birthplace ?? "-"}
        </div>
      </section>

      <section className="status-row">
        <StatusCard label="HP" value={`${character.HP}/${character.maxHP}`} />

        <StatusCard label="MP" value={`${character.MP}/${character.maxMP}`} />

        <StatusCard label="SAN" value={character.sanity} />

        <StatusCard label="LUCK" value={character.luck} />

        <StatusCard label="MOVE" value={character.moveRate} />
      </section>

      <section>
        <h2>Characteristics</h2>

        <div className="characteristics-grid">
          {Object.entries(character.characteristics).map(([key, value]) => (
              <div key={key} className="stat-box">
              <span>{key.toUpperCase()}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Skills</h2>

        <div className="skills-grid">
          {Object.entries(character.skills).map(([key, value]) => (
              <div key={key} className="skill-row">
              <span>
                {BASE_SKILLS[key as keyof typeof BASE_SKILLS]?.label ?? key}
              </span>
              <strong>{value}%</strong>
            </div>
          ))}
        </div>
      </section>

      {character.mjWound && <div className="warning">Major Wound</div>}
    </div>
</div>
  );
}

function StatusCard({
    label,
    value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="status-card">
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}
