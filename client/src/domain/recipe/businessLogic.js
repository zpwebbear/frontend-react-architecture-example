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
  };
}

export const deleteRecipeItem = (drugs, id) => {
  return drugs.filter((drug) => drug.id !== id);
};

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
    dayPlan.addDrug(drug);
    this.days[day] = dayPlan;
  }
  toJSON() {
    return this.days.map((dayPlan) => dayPlan.toJSON());
  };
}

class DayPlan {
  morning = [];
  afternoon = [];
  evening = [];
  night = [];
  addDrug(drug) {
    const { timesPerDay } = drug;
    if (timesPerDay === 1) {
      this.morning.push(drug);
    } else if (timesPerDay === 2) {
      this.morning.push(drug);
      this.evening.push(drug);
    } else if (timesPerDay === 3) {
      this.morning.push(drug);
      this.afternoon.push(drug);
      this.evening.push(drug);
    } else if (timesPerDay === 4) {
      this.morning.push(drug);
      this.afternoon.push(drug);
      this.evening.push(drug);
      this.night.push(drug);
    }
  }
  toJSON() {
    return {
      morning: this.morning,
      afternoon: this.afternoon,
      evening: this.evening,
      night: this.night,
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