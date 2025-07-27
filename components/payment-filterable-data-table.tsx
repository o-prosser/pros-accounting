"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  CalendarIcon,
  ChevronDownIcon,
  FilterIcon,
  ListFilter,
  PoundSterlingIcon,
  SearchIcon,
  TagIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";
import { SelectCategory, SelectFinancialYear } from "@/drizzle/schema";
import Link from "next/link";
import { format, isPast } from "date-fns";
import { useSearchParams } from "next/navigation";
import LoadingIndicator from "./loading-indicator";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const CategoryFilter = ({
  categories,
  onCategoriesChange,
}: {
  categories: SelectCategory[];
  onCategoriesChange: (categories: SelectCategory[]) => void;
}) => {
  const searchParams = useSearchParams();
  const searchParamCategoryId = searchParams.get("category");
  const searchParamCategory = categories.find(
    (c) => searchParamCategoryId === c.id,
  );

  // Categories filter
  const [selectedCategories, setSelectedCategories] = useState<
    SelectCategory[]
  >(searchParamCategory ? [searchParamCategory] : []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCategoryChange = (category: SelectCategory, checked: boolean) => {
    let newSelectedCategories: SelectCategory[];
    if (checked) {
      newSelectedCategories = [...selectedCategories, category];
    } else {
      newSelectedCategories = selectedCategories.filter((c) => c !== category);
    }
    setSelectedCategories(newSelectedCategories);
    onCategoriesChange(newSelectedCategories);
  };

  const getButtonText = () => {
    if (selectedCategories.length === 0) {
      return "All categories";
    } else if (selectedCategories.length === 1) {
      return selectedCategories[0].name;
    } else {
      return `${selectedCategories.length} Categories`;
    }
  };

  const clearAll = () => {
    setSelectedCategories([]);
    onCategoriesChange([]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span className="w-24">{getButtonText()}</span>
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-0" align="end">
        {/* Search Input */}
        <div className="mb-1 relative">
          <SearchIcon className="absolute left-3 mt-3 transform size-4 text-background/80" />
          <Input
            type="text"
            placeholder="Search categories"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-foreground rounded-none border-0 border-b border-accent-foreground/30 text-background placeholder:text-background/80"
          />
        </div>

        <DropdownMenuGroup className="space-y-0 max-h-48 overflow-y-auto px-1 pb-2">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <DropdownMenuCheckboxItem
                  id={category.id}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category, checked as boolean)
                  }
                >
                  <Label
                    htmlFor={category.id}
                    className="text-sm font-normal cursor-pointer text-background"
                  >
                    {category.name}
                  </Label>
                </DropdownMenuCheckboxItem>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground py-2">
              No categories found
            </p>
          )}
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          {selectedCategories.length > 0 && (
            <Button
              variant="ghost"
              className="w-full border-0 border-t border-accent-foreground/30 rounded-none hover:bg-background/10"
              onClick={clearAll}
            >
              Clear
            </Button>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function PaymentFilterableDataTable<TData, TValue>({
  columns,
  data,
  searchable = true,
  categoryKey,
  categories,
  financialYears,
  currentFinancialYear,
}: DataTableProps<TData, TValue> & {
  searchable?: boolean;
  categories: SelectCategory[];
  categoryKey: keyof TData;
  financialYears: SelectFinancialYear[];
  currentFinancialYear?: SelectFinancialYear;
}) {
  const searchParams = useSearchParams();
  const searchParamCategoryId = searchParams.get("category");
  const searchParamCategory = categories.find(
    (c) => searchParamCategoryId === c.id,
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    SelectCategory[]
  >(searchParamCategory ? [searchParamCategory] : []);

  const filteredData = useMemo(() => {
    if (selectedCategories.length === 0) {
      return data;
    }
    const selectedCategoriesIds = selectedCategories.map((c) => c.id);
    return data.filter((item) =>
      selectedCategoriesIds.includes(item[categoryKey] as string),
    );
  }, [data, selectedCategories, categoryKey]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      {searchable ? (
        <div className="items-center flex rounded-2xl bg-muted/50 p-3 border mb-3 gap-2">
          <h3 className="font-medium text-xl flex-1">Recent payments</h3>

          <div className="relative">
            <div className="h-10 absolute left-3 inset-y-0 grid place-items-center">
              <SearchIcon className="text-muted-foreground size-4" />
            </div>
            <Input
              placeholder="Search"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-xs placeholder:text-foreground placeholder:font-medium pl-9"
            />
          </div>

          <CategoryFilter
            onCategoriesChange={setSelectedCategories}
            categories={categories}
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                Filter
                <ListFilter />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72">
              <p className="font-medium !pb-1.5 text-sm">Financial year</p>
              {financialYears.filter((fy) => fy.isCurrent === true).length >
              0 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-foreground w-full justify-between"
                    >
                      {format(
                        currentFinancialYear?.startDate || new Date(),
                        "MMM yyyy",
                      )}{" "}
                      &mdash;{" "}
                      {isPast(currentFinancialYear?.endDate || new Date())
                        ? format(
                            currentFinancialYear?.endDate || new Date(),
                            "MMM yyyy",
                          )
                        : "present"}
                      <ChevronDownIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Financial years</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      {financialYears.map((fy, key) => (
                        <DropdownMenuItem asChild key={key}>
                          <Link
                            href={`/cashbook?fy=${
                              fy.id
                            }&account=${searchParams.get("account")}`}
                          >
                            <div className="size-1.5 bg-popover-foreground/80 rounded-full mr-2"></div>
                            {format(fy.startDate, "d MMMM yyyy")} &ndash;{" "}
                            {format(fy.endDate, "d MMMM yyyy")}
                            <LoadingIndicator />
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                ""
              )}
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        ""
      )}
      <div className="rounded-2xl border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
