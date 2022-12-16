

export interface FilterItemInterface {
	id: string,
	name: string,
	belongsTo: string[]
}

export interface FilterInterface {
	branches?: FilterItemInterface[]
    directors?: FilterItemInterface[]
    managers?: FilterItemInterface[],
    coordinators?: FilterItemInterface[],
    supervisors?: FilterItemInterface[],
    sellers?: FilterItemInterface[],
    networks: FilterItemInterface[],
    channels: FilterItemInterface[],
    clients: FilterItemInterface[],
}

export interface SearchFilterInterface {
    branch?: boolean,
    director?: boolean,
    manager?: boolean,
    supervisor?: boolean,
	coordinator?: boolean,
    seller?: boolean,
	network?: boolean,
	channel?: boolean,
    client?: boolean,
    date?: boolean,
    merchandising?: string,
    startDate?: string | Date,
    endDate?: string | Date,
    query?: Record<string, unknown>
}
