export default {
  getFormattedDate(date: Date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1)}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
  },
  getListOfMonths(){
    const listOfMonths: { name: string, monthNumber: number, items: any }[] = [
        { name: "Janeiro", monthNumber: 1, items: [] }, 
        { name: "Fevereiro", monthNumber: 2, items: []  }, 
        { name: "Março", monthNumber: 3, items: []  }, 
        { name: "Abril", monthNumber: 4, items: []  }, 
        { name: "Maio", monthNumber: 5, items: []  }, 
        { name: "Junho", monthNumber: 6, items: []  }, 
        { name: "Julho", monthNumber: 7, items: []  }, 
        { name: "Agosto", monthNumber: 8, items: []  }, 
        { name: "Setembro", monthNumber: 9, items: []  }, 
        { name: "Outubro", monthNumber: 10, items: []  }, 
        { name: "Novembro", monthNumber: 11, items: []  }, 
        { name: "Dezembro", monthNumber: 12, items: []  }
    ];  
    return listOfMonths;
  }
}

export const calender = {
  getInstance: function (millis = new Date().getTime(), diffHours: number = -3) {
    let date = new Date(millis);
    let hours = date.getHours();
    hours += diffHours;
    date.setHours(hours)

    return date;
  },
  getMaxDaysOfMonth(date = new Date()) {

    let calendar = date;

    calendar.setMonth(calendar.getMonth() + 1);
    calendar.setDate(0)

    return calendar.getDate();

  },
  workingDays() {

    let workingDays = 0;

    let days = this.getMaxDaysOfMonth();

    let calendar = this.getInstance();

    for (let position = 1; position < days + 1; position++) {

        calendar.setDate(position);

        let dayOfWeek = calendar.getDay();
        if (dayOfWeek != 0 && dayOfWeek != 6) {
            workingDays++;
        }
    }

    return workingDays;
  },
  rushDays(): number {

    let day = this.getInstance().getDate();

    day++;

    let currentRushDaysWorking = 0;

    let calendar = this.getInstance();

    for (let position = 1; position < day; position++) {

        calendar.setDate(position);

        let dayOfWeek = calendar.getDay();

        if (dayOfWeek != 0 && dayOfWeek != 6) {

            currentRushDaysWorking++;
        }

    }

    if (currentRushDaysWorking > this.workingDays())
        currentRushDaysWorking = this.workingDays();

    return currentRushDaysWorking;
  },
  daysLeft(): number {
    return this.workingDays() - this.rushDays();
  }
}