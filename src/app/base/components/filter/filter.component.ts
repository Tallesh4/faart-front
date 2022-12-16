import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterInterface, FilterItemInterface, SearchFilterInterface } from './filter.interface';
import { FilterService } from './filter.service';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor (
    private filterService: FilterService
  ) { }

  @Input() filters: SearchFilterInterface = {
	branch: true,
	director: true,
	manager: true,
	coordinator: false,
    supervisor: true,
    seller: true,
    network: true,
    channel: true,
    client: true,
	date: true,
    merchandising: "",
  };

  @Output() FilterParams = new EventEmitter<any>();

  loadingFilter: boolean = false;
  dateToday = new Date();
  startDate: string = this.getFormattedDate(new Date());
  endDate: string = this.getFormattedDate(new Date());

  FilterForm = new FormGroup({
    branches: new FormControl(""),
    directors: new FormControl(""),
    managers: new FormControl(""),
    coordinators: new FormControl(""),
    supervisors: new FormControl(""),
    sellers: new FormControl(""),
    networks: new FormControl(""),
    channels: new FormControl(""),
    clients: new FormControl(""),
    periods: new FormControl(""),
    startDate: new FormControl(this.startDate),
    endDate: new FormControl(this.endDate),
    userId: new FormControl(""),
  });

  filterData: FilterInterface = {
    branches: [],
    directors: [],
    managers: [],
	coordinators: [],
    supervisors: [],
    sellers: [],
    networks: [],
	channels: [],
    clients: [],
  }
  defaultFilterData: FilterInterface = {
    branches: [],
    directors: [],
    managers: [],
	coordinators: [],
    supervisors: [],
    sellers: [],
    networks: [],
	channels: [],
    clients: [],
  }

  ngOnInit(): void {
    this.getFilter()
  }

  getFilter(){
    this.loadingFilter = true;

    this.filterService.getFilter(this.filters).subscribe(response => {
      	this.filterData = response;
		this.defaultFilterData = {...response};
		this.loadingFilter = false;
    })
  }

	changeFilter() {
		const data = this.FilterForm.value;
		this.filterData = {...this.defaultFilterData};

		if(data.branches) {
			this.filterData.clients = this.filterData.clients.filter((outlet: FilterItemInterface) => {
				if(outlet.belongsTo.includes(data.branches)) {
					return true;
				}
				return false;
			});
			this.filterData.directors = this.filterData.directors?.filter((director: FilterItemInterface) => {
				if(director.belongsTo.includes(data.branches)) {
					return true;
				}
				return false;
			});
			this.filterData.managers = this.filterData.managers?.filter((manager: FilterItemInterface) => {
				if(manager.belongsTo.includes(data.branches)) {
					return true;
				}
				return false;
			});
			this.filterData.coordinators = this.filterData.coordinators?.filter((coordinator: FilterItemInterface) => {
				if(coordinator.belongsTo.includes(data.branches)) {
					return true;
				}
				return false;
			});
			this.filterData.supervisors = this.filterData.supervisors?.filter((supervisor: FilterItemInterface) => {
				if(supervisor.belongsTo.includes(data.branches)) {
					return true;
				}
				return false;
			});
			this.filterData.sellers = this.filterData.sellers?.filter((seller: FilterItemInterface) => {
				if(seller.belongsTo.includes(data.branches)) {
					return true;
				}
				return false;
			});
			this.filterData.clients = this.filterData.clients.filter((outlet: FilterItemInterface) => {
				if(outlet.belongsTo.includes(data.branches)) {
					return true;
				}
				return false;
			});
		}

		if(data.directors) {
			this.filterData.managers = this.filterData.managers?.filter((manager => {
				if(manager.belongsTo.includes(data.directors)) {
					return true;
				}
				return false;
			}));
		}
		data.managers = this.filterData.managers?.find(manager => manager.id == data.managers) ? data.managers : null;

		if(data.managers) {
			this.filterData.coordinators = this.filterData.coordinators?.filter((user => {
				if(user.belongsTo.includes(data.managers)) {
					return true;
				}
				return false;
			}));
		} else {
			this.filterData.coordinators = this.filterData.coordinators?.filter((user => {
				if(this.filterData.managers) {
					for(let manager of this.filterData.managers) {
						if(user.belongsTo.includes(manager.id)) {
							return true;
						}
					}
				}
				return false;
			}));
		}
		data.coordinators = this.filterData.coordinators?.find(coordinator => coordinator.id == data.coordinators) ? data.coordinators : null;

		if(data.coordinators) {
			this.filterData.supervisors = this.filterData.supervisors?.filter((user => {
				if(user.belongsTo.includes(data.coordinators)) {
					return true;
				}
				return false;
			}));
		} else {
			this.filterData.supervisors = this.filterData.supervisors?.filter((user => {
				if(this.filterData.coordinators) {
					for(let coordinator of this.filterData.coordinators) {
						if(user.belongsTo.includes(coordinator.id)) {
							return true;
						}
					}
				}
				return false;
			}));
		}
		data.supervisors = this.filterData.supervisors && this.filterData.supervisors.find(supervisor => supervisor.id == data.supervisors) ? data.supervisors : null;

		if(data.supervisors) {
			this.filterData.sellers = this.filterData.sellers?.filter((user => {
				if(user.belongsTo.includes(data.supervisors)) {
					return true;
				}
				return false;
			}));
		} else {
			/* this.filterData.sellers = this.filterData.sellers?.filter((user => {
				if(this.filterData.supervisors) {
					for(let supervisor of this.filterData.supervisors) {
						if(user.belongsTo.includes(supervisor.id)) {
							return true;
						}
					}
				}
				return false;
			})); */
		}

		if(data.networks) {
			this.filterData.clients = this.filterData.clients.filter((outlet: FilterItemInterface) => {
				if(outlet.belongsTo.includes(data.networks)) {
					return true;
				}
				return false;
			});
		}
		if(data.channels) {
			this.filterData.clients = this.filterData.clients.filter((outlet: FilterItemInterface) => {
				if(outlet.belongsTo.includes(data.channels)) {
					return true;
				}
				return false;
			});
		}

		return this.filterData;
	}

  setDayPeriods(event: any){
    const dateNow = new Date();

    switch(event.value){
      case 'today':
        this.FilterForm.value.startDate = new Date().setHours(0, 0, 0, 0);
        this.FilterForm.value.endDate = new Date().setUTCHours(23, 59, 59, 59);
        break;

      case 'yesterday':
        this.FilterForm.value.startDate = new Date(dateNow.setDate(dateNow.getDate() - 1)).setHours(0, 0, 0, 0);
        this.FilterForm.value.endDate = new Date().setUTCHours(23, 59, 59, 59);
        break;

      case '7 days':
        this.FilterForm.value.startDate = new Date(dateNow.setDate(dateNow.getDate() - 7)).setHours(0, 0, 0, 0);
        this.FilterForm.value.endDate = new Date().setUTCHours(23, 59, 59, 59);
        break;

      case '30 days':
        this.FilterForm.value.startDate = new Date(dateNow.setDate(dateNow.getDate() - 30)).setHours(0, 0, 0, 0);
        this.FilterForm.value.endDate = new Date().setUTCHours(23, 59, 59, 59);
        break;
    }

    this.FilterForm.value.startDate = new Date(this.FilterForm.value.startDate);
    this.FilterForm.value.endDate = new Date(this.FilterForm.value.endDate);
  }

  submit(){
    this.FilterParams.emit(this.FilterForm.value);
  }

  getFormattedDate(date: Date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1) < 10 ? `0${(date.getMonth() + 1)}` : (date.getMonth() + 1)}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
  }
}
