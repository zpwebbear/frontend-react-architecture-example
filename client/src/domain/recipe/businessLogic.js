export const validateRecipeItem = (data) => {
  let { name, timesPerDay = 1, duration = 1 } = data;
  let normalizedTimesPerDay = parseInt(timesPerDay, 10);
  let normalizedDuration = parseInt(duration, 10);
  if (isNaN(normalizedTimesPerDay)) {
    normalizedTimesPerDay = 1;
  }
  if (isNaN(normalizedDuration)) {
    normalizedDuration = 1;
  }
  if (normalizedTimesPerDay > 4) normalizedTimesPerDay = 4;
  if (normalizedTimesPerDay < 1) normalizedTimesPerDay = 1;
  if (normalizedDuration < 1) normalizedDuration = 1;
  if (normalizedDuration > 30) normalizedDuration = 30;
  if (!name) throw new Error("name is required");

  return {
    name,
    timesPerDay: normalizedTimesPerDay,
    duration: normalizedDuration,
  }
}

export const createRecipeItem = (data, options) => {
  const { name, timesPerDay = 1, duration = 1 } = data;
  const { idProvider } = options;
  if (!idProvider) {
    throw new Error("idProvider is required");
  }

  return {
    id: idProvider.getId(),
    name,
    timesPerDay,
    duration,
    editable: false,
  };
}

export const deleteRecipeItem = (drugs, id) => {
  return drugs.filter((drug) => drug.id !== id);
};

export const setRecipeItemEditable = (drugs, id) => {
  return drugs.map((drug) => {
    if (drug.id === id) {
      return {
        ...drug,
        editable: true,
      };
    }
    return drug;
  });
}

export const saveRecipeItem = (drugs, id) => {
  return drugs.map((drug) => {
    if (drug.id === id) {
      return {
        ...drug,
        editable: false,
      };
    }
    return drug;
  });
}

export const updateRecipeItem = (drugs, id, data) => {
  const { name, timesPerDay, duration } = data;
  return drugs.map((drug) => {
    if (drug.id === id) {
      return {
        ...drug,
        name,
        timesPerDay,
        duration,
      };
    }
    return drug;
  });
}


class Plan {
  days = [];
  addDrug(drug) {
    const { duration } = drug;
    for (let i = 0; i < duration; i++) {
      this.addDrugToDay(drug, i);
    }
  }
  addDrugToDay(drug, day) {
    const dayPlan = this.days[day] || new DayPlan();
    dayPlan.addDrug(drug, day);
    this.days[day] = dayPlan;
  }
  toJSON() {
    return this.days.map((dayPlan) => dayPlan.toJSON());
  };
}

class DayPlan {
  static timePeriods = {
    1: ['morning'],
    2: ['morning', 'evening'],
    3: ['morning', 'afternoon', 'evening'],
    4: ['morning', 'afternoon', 'evening', 'night']
  };
  morning = [];
  afternoon = [];
  evening = [];
  night = [];
  day = null;

  addDrug(drug, day) {
    this.day = day;
    const { timesPerDay } = drug;
    const periods = DayPlan.timePeriods[timesPerDay] || ['morning'];
    periods.forEach(period => {
      this[period].push(drug);
    });
  }

  toJSON() {
    return {
      morning: this.morning,
      afternoon: this.afternoon,
      evening: this.evening,
      night: this.night,
      day: this.day,
    };
  };
}

export const calculateIngestingInstructions = (drugs) => {
  const plan = new Plan();
  drugs.forEach((drug) => {
    plan.addDrug(drug);
  });
  return plan.toJSON();
}