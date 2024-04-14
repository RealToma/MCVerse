const parts = [
  {
    name: 'stage 1',
    level: 4,
    speed: 2,
    subStages: [
      {
        name: 'intake',
        level: 1,
        cost: 80,
      },
      {
        name: 'cams',
        level: 2,
        cost: 100,
      },
      {
        name: 'headers',
        level: 3,
        cost: 120,
      },
      {
        name: 'converter',
        level: 4,
        cost: 140,
      },
    ],
  },
  {
    name: 'stage 2',
    level: 8,
    speed: 2,
    subStages: [
      {
        name: 'tuner kit',
        level: 5,
        cost: 160,
      },
      {
        name: 'injectors',
        level: 6,
        cost: 180,
      },
      {
        name: 'nos',
        level: 7,
        cost: 200,
      },
      {
        name: 'trans brake',
        level: 8,
        cost: 220,
      },
    ],
  },
  {
    name: 'stage 3',
    level: 12,
    speed: 4,
    subStages: [
      {
        name: 'race slicks',
        level: 9,
        cost: 240,
      },
      {
        name: 'calipers',
        level: 10,
        cost: 280,
      },
      {
        name: 'roll cage',
        level: 11,
        cost: 320,
      },
      {
        name: 'exhaust',
        level: 12,
        cost: 360,
      },
    ],
  },
]
const crews = [
  {
    name: 'tier 1',
    level: 4,
    speed: 1,
    subStages: [
      {
        name: 'crew chief',
        level: 1,
        cost: 100,
      },
      {
        name: 'mechanic',
        level: 2,
        cost: 100,
      },
      {
        name: 'tirechanger',
        level: 3,
        cost: 100,
      },
      {
        name: 'gasman',
        level: 4,
        cost: 100,
      },
    ],
  },
  {
    name: 'tier 2',
    level: 8,
    speed: 2,
    subStages: [
      {
        name: 'crew chief',
        level: 5,
        cost: 180,
      },
      {
        name: 'mechanic',
        level: 6,
        cost: 180,
      },
      {
        name: 'tirechanger',
        level: 7,
        cost: 180,
      },
      {
        name: 'gasman',
        level: 8,
        cost: 180,
      },
    ],
  },
  {
    name: 'tier 3',
    level: 12,
    speed: 4,
    subStages: [
      {
        name: 'crew chief',
        level: 9,
        cost: 320,
      },
      {
        name: 'mechanic',
        level: 10,
        cost: 320,
      },
      {
        name: 'tirechanger',
        level: 11,
        cost: 320,
      },
      {
        name: 'gasman',
        level: 12,
        cost: 320,
      },
    ],
  },
]
const memberLabel = {
  muscle: 'mechanic',
  super: 'pit crew',
}
const members = {
  muscle: parts,
  super: crews,
}
const superCarEarnSpeedByStage = {
  0: {
    stage: 0,
    stageLevel: 0,
    earnSpeed: 2,
  },
  1: {
    stage: 1,
    stageLevel: 1,
    earnSpeed: 3,
  },
  2: {
    stage: 2,
    stageLevel: 1,
    earnSpeed: 4,
  },
  3: {
    stage: 3,
    stageLevel: 1,
    earnSpeed: 5,
  },
  4: {
    stage: 4,
    stageLevel: 1,
    earnSpeed: 6,
  },
  5: {
    stage: 5,
    stageLevel: 2,
    earnSpeed: 8,
  },
  6: {
    stage: 6,
    stageLevel: 2,
    earnSpeed: 10,
  },
  7: {
    stage: 7,
    stageLevel: 2,
    earnSpeed: 12,
  },
  8: {
    stage: 8,
    stageLevel: 2,
    earnSpeed: 14,
  },
  9: {
    stage: 9,
    stageLevel: 3,
    earnSpeed: 18,
  },
  10: {
    stage: 10,
    stageLevel: 3,
    earnSpeed: 22,
  },
  11: {
    stage: 11,
    stageLevel: 3,
    earnSpeed: 26,
  },
  12: {
    stage: 12,
    stageLevel: 3,
    earnSpeed: 30,
  },
}
const muscleCarEarnSpeedByStage = {
  0: {
    stage: 0,
    stageLevel: 0,
    earnSpeed: 2,
  },
  1: {
    stage: 1,
    stageLevel: 1,
    earnSpeed: 4,
  },
  2: {
    stage: 2,
    stageLevel: 1,
    earnSpeed: 6,
  },
  3: {
    stage: 3,
    stageLevel: 1,
    earnSpeed: 8,
  },
  4: {
    stage: 4,
    stageLevel: 1,
    earnSpeed: 10,
  },
  5: {
    stage: 5,
    stageLevel: 2,
    earnSpeed: 12,
  },
  6: {
    stage: 6,
    stageLevel: 2,
    earnSpeed: 14,
  },
  7: {
    stage: 7,
    stageLevel: 2,
    earnSpeed: 16,
  },
  8: {
    stage: 8,
    stageLevel: 2,
    earnSpeed: 18,
  },
  9: {
    stage: 9,
    stageLevel: 3,
    earnSpeed: 22,
  },
  10: {
    stage: 10,
    stageLevel: 3,
    earnSpeed: 26,
  },
  11: {
    stage: 11,
    stageLevel: 3,
    earnSpeed: 30,
  },
  12: {
    stage: 12,
    stageLevel: 3,
    earnSpeed: 34,
  },
}

const earnSpeedByStage = {
  muscle: muscleCarEarnSpeedByStage,
  super: superCarEarnSpeedByStage,
}

export { parts, crews, memberLabel, members, earnSpeedByStage }
