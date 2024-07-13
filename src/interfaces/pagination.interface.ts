export interface PaginationInterface {
	item_count: number;
	per_page: number;
	current_page: number;
	page_count: number;
	page_counter: number;
	has_prev: boolean;
	has_next: boolean;
	prev: number | null;
	next: number | null;
}
