export const metaPaginationBuilder = (
	offset: number,
	limit: number,
	rowCount: number
): {
	item_count: number;
	per_page: number;
	current_page: number;
	page_count: number;
	page_counter: number;
	has_prev: boolean;
	has_next: boolean;
	prev: number | null;
	next: number | null;
} => {
	const currentPage = Math.floor(offset / limit) + 1;
	const pageCount = Math.ceil(rowCount / limit);
	const pageCounter = currentPage > 1 ? currentPage * limit + 1 - limit : 1;
	const hasPrev = currentPage > 1;
	const hasNext = currentPage < pageCount;
	const prev = hasPrev ? currentPage - 1 : null;
	const next = hasNext ? currentPage + 1 : null;
	const itemCount = rowCount;
	const perPage = limit;

	return {
		item_count: itemCount,
		per_page: perPage,
		current_page: currentPage,
		page_count: pageCount,
		page_counter: pageCounter,
		has_prev: hasPrev,
		has_next: hasNext,
		prev: prev,
		next: next,
	};
};
