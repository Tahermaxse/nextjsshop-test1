// @ts-nocheck
"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiErrorWarningLine,
  RiCloseCircleLine,
  RiDeleteBinLine,
  RiBardLine,
  RiFilter3Line,
  RiSearch2Line,
  RiVerifiedBadgeFill,
  RiCheckLine,
  RiMoreLine,
} from "@remixicon/react";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";

type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};
type Item = {
  id: number;
  email: string;
  name: string;
  image: string;
  role: string;
  status: "Active" | "Inactive";
  verified?: boolean;
  canComment?: boolean;
  canReport?: boolean;
  orders: {
    id: number;
    amount: number;
    currency: string;
    status: string;
    createdAt: string;
    template?: {
      name: string;
      price: number;
    };
    component?: {
      name: string;
      price: number;
    };
  }[];
  templatePurchases: {
    id: number;
    template: {
      name: string;
      price: number;
    };
    purchaseDate: string;
    amount: number;
    status: string;
  }[];
  componentPurchases: {
    id: number;
    component: {
      name: string;
      price: number;
    };
    purchaseDate: string;
    amount: number;
    status: string;
  }[];
};

const statusFilterFn: FilterFn<Item> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

interface GetColumnsProps {
  data: Item[];
  setData: React.Dispatch<React.SetStateAction<Item[]>>;
}

const getColumns = ({ data, setData,showAllPurchases }: GetColumnsProps  & { showAllPurchases: boolean }): ColumnDef<Item>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={row.original.image} alt={row.getValue("name")} />
          <AvatarFallback>
            {row.getValue("name")
              ? (row.getValue("name") as string).charAt(0)
              : "U"}
          </AvatarFallback>
        </Avatar>
        <div className="font-medium">{row.getValue("name")}</div>
      </div>
    ),
    size: 180,
    enableHiding: false,
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("email")}</span>
    ),
    size: 200,
  },
  {
    header: "Role",
    accessorKey: "role",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("role")}</span>
    ),
    size: 100,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <Badge
        variant={row.getValue("status") === "Active" ? "default" : "secondary"}
      >
        {row.getValue("status")}
      </Badge>
    ),
    size: 100,
    filterFn: statusFilterFn,
  },
  // {
  //   header: "Orders",
  //   accessorKey: "orders",
  //   cell: ({ row }) => (
  //     <div className="flex flex-col gap-1">
  //       {row.original.orders.map((order) => (
  //         <div key={order.id} className="text-muted-foreground">
  //           {order.template?.name || order.component?.name} - {order.amount}{" "}
  //           {order.currency}
  //         </div>
  //       ))}
  //     </div>
  //   ),
  //   size: 200,
  // },
  {
    header: "Template Name",
    accessorKey: "templatePurchases",
    cell: ({ row }) => {
      const purchases = row.original.templatePurchases;
      if (!purchases.length) return null;
      
      if (showAllPurchases) {
        return (
          <div className="flex flex-col gap-1">
            {purchases.map((purchase) => (
              <div key={purchase.id} className="text-muted-foreground">
                {purchase.template.name}
              </div>
            ))}
          </div>
        );
      }

      // Show only latest purchase
      const latestPurchase = [...purchases].sort((a, b) => 
        new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
      )[0];
      
      return (
        <div className="text-muted-foreground">
          {latestPurchase?.template.name}
        </div>
      );
    },
    size: 200,
  },
  {
    header: "Template Date",
    accessorKey: "templatedate",
    cell: ({ row }) => {
      const purchases = row.original.templatePurchases;
      if (!purchases.length) return null;
      
      if (showAllPurchases) {
        return (
          <div className="flex flex-col gap-1">
            {purchases.map((purchase) => (
              <div key={purchase.id} className="text-muted-foreground">
                  {format(new Date(purchase.purchaseDate), "MMM dd, yyyy")}
              </div>
            ))}
          </div>
        );
      }

      // Show only latest purchase
      const latestPurchase = [...purchases].sort((a, b) => 
        new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
      )[0];
      
      return (
        <div className="text-muted-foreground">
          {format(new Date(latestPurchase.purchaseDate), "MMM dd, yyyy")}
        </div>
      );
    },
    size: 200,
  },
  {
    header: "Template Amount",
    accessorKey: "templateamount",
    cell: ({ row }) => {
      const purchases = row.original.templatePurchases;
      if (!purchases.length) return null;

      if (showAllPurchases) {
        return (
          <div className="flex flex-col gap-1">
            {purchases.map((purchase) => (
              <div key={purchase.id} className="text-muted-foreground">
                $ {purchase.amount}
              </div>
            ))}
          </div>
        );
      }

      const latestPurchase = [...purchases].sort((a, b) => 
        new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
      )[0];
      
      return (
        <div className="text-muted-foreground">
          {latestPurchase ? `$ ${latestPurchase.amount}` : ''}
        </div>
      );
    },
    size: 200,
  },
  {
    header: "Component Name",
    accessorKey: "componentPurchases",
    cell: ({ row }) => {
      const purchases = row.original.componentPurchases;
      if (!purchases.length) return null;
      
      if (showAllPurchases) {
        return (
          <div className="flex flex-col gap-1">
            {purchases.map((purchase) => (
              <div key={purchase.id} className="text-muted-foreground">
                {purchase.component.name}
                <span className="text-xs text-muted-foreground ml-2">
                  ({format(new Date(purchase.purchaseDate), "MMM dd, yyyy")})
                </span>
              </div>
            ))}
          </div>
        );
      }

      // Show only latest purchase
      const latestPurchase = [...purchases].sort((a, b) => 
        new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
      )[0];
      
      return (
        <div className="text-muted-foreground">
          {latestPurchase?.component.name}
          <span className="text-xs text-muted-foreground ml-2">
            ({format(new Date(latestPurchase.purchaseDate), "MMM dd, yyyy")})
          </span>
        </div>
      );
    },
    size: 200,
  },
  {
    header: "Component Date",
    accessorKey: "componentDate",
    cell: ({ row }) => {
      const purchases = row.original.componentPurchases;
      if (!purchases.length) return null;
      
      if (showAllPurchases) {
        return (
          <div className="flex flex-col gap-1">
            {purchases.map((purchase) => (
              <div key={purchase.id} className="text-muted-foreground">
              {format(new Date(purchase.purchaseDate), "MMM dd, yyyy")}
              </div>
            ))}
          </div>
        );
      }

      // Show only latest purchase
      const latestPurchase = [...purchases].sort((a, b) => 
        new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
      )[0];
      
      return (
        <div className="text-muted-foreground">
            {format(new Date(latestPurchase.purchaseDate), "MMM dd, yyyy")}
        </div>
      );
    },
    size: 200,
  },
  {
    header: "Component Amount",
    accessorKey: "componentamount",
    cell: ({ row }) => {
      const purchases = row.original.componentPurchases;
      if (!purchases.length) return null;

      if (showAllPurchases) {
        return (
          <div className="flex flex-col gap-1">
            {purchases.map((purchase) => (
              <div key={purchase.id} className="text-muted-foreground font-semibold">
                $ {purchase.amount}
              </div>
            ))}
          </div>
        );
      }

      const latestPurchase = [...purchases].sort((a, b) => 
        new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
      )[0];
      
      return (
        <div className="text-muted-foreground">
          {latestPurchase ? `$ ${latestPurchase.amount}` : ''}
        </div>
      );
    },
    size: 200,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => (
      <RowActions setData={setData} data={data} item={row.original} />
    ),
    size: 60,
    enableHiding: false,
  },
];

export default function ContactsTable() {
  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [showAllPurchases, setShowAllPurchases] = useState(false);
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);

  const [data, setData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = useMemo(
    () => getColumns({ data: filteredData, setData, showAllPurchases }), 
    [filteredData, showAllPurchases]
  );

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        // Ensure we're using the exact boolean values from the database
        const dataWithPermissions = data.map((user: Item) => ({
          ...user,
          canComment: Boolean(user.canComment), // Convert to boolean explicitly
          canReport: Boolean(user.canReport), // Convert to boolean explicitly
        }));
        setData(dataWithPermissions);
        console.log('Fetched users with permissions:', dataWithPermissions);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const handleDeleteRows = async () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const selectedIds = selectedRows.map(row => row.original.id);
  
    if (selectedIds.length === 0) {
      toast.warning("No records selected!");
      return;
    }
  
    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedIds }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete users');
      }
  
      // Update local state only after successful deletion
      const updatedData = data.filter(item => !selectedIds.includes(item.id));
      setData(updatedData);
      table.resetRowSelection();
  
      toast.success(`${selectedIds.length} Record(s) Deleted!`);
    } catch (error) {
      console.error('Error deleting users:', error);
      toast.error("Failed to delete records!");
    }
  };
  

  useEffect(() => {
    if (!data.length) {
      setFilteredData([]);
      return;
    }

    const filtered = data.map(item => {
      const filteredTemplates = item.templatePurchases.filter(purchase => {
        const purchaseDate = new Date(purchase.purchaseDate);
        if (dateRange.from && dateRange.to) {
          return purchaseDate >= dateRange.from && purchaseDate <= dateRange.to;
        }
        if (dateRange.from) {
          return purchaseDate >= dateRange.from;
        }
        if (dateRange.to) {
          return purchaseDate <= dateRange.to;
        }
        return true;
      });

      const filteredComponents = item.componentPurchases.filter(purchase => {
        const purchaseDate = new Date(purchase.purchaseDate);
        if (dateRange.from && dateRange.to) {
          return purchaseDate >= dateRange.from && purchaseDate <= dateRange.to;
        }
        if (dateRange.from) {
          return purchaseDate >= dateRange.from;
        }
        if (dateRange.to) {
          return purchaseDate <= dateRange.to;
        }
        return true;
      });

      return {
        ...item,
        templatePurchases: filteredTemplates,
        componentPurchases: filteredComponents,
      };
    });

    setFilteredData(filtered);
  }, [data, dateRange, showAllPurchases]);

  


  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  });

  // Extract complex expressions into separate variables
  const statusColumn = table.getColumn("status");
  const statusFacetedValues = statusColumn?.getFacetedUniqueValues();
  const statusFilterValue = statusColumn?.getFilterValue();

  // Update useMemo hooks with simplified dependencies
  const uniqueStatusValues = useMemo(() => {
    if (!statusColumn) return [];
    const values = Array.from(statusFacetedValues?.keys() ?? []);
    return values.sort();
  }, [statusColumn, statusFacetedValues]);

  const statusCounts = useMemo(() => {
    if (!statusColumn) return new Map();
    return statusFacetedValues ?? new Map();
  }, [statusColumn, statusFacetedValues]);

  const selectedStatuses = useMemo(() => {
    return (statusFilterValue as string[]) ?? [];
  }, [statusFilterValue]);

  const handleStatusChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn("status")?.getFilterValue() as string[];
    const newFilterValue = filterValue ? [...filterValue] : [];

    if (checked) {
      newFilterValue.push(value);
    } else {
      const index = newFilterValue.indexOf(value);
      if (index > -1) {
        newFilterValue.splice(index, 1);
      }
    }

    table
      .getColumn("status")
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

  

  return (
    <div className="space-y-4">
      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {/* Filter by name */}
          <div className="relative">
            <Input
              id={`${id}-input`}
              ref={inputRef}
              className={cn(
                "peer min-w-60 ps-9 bg-gradient-to-br from-accent/60 to-accent",
                Boolean(table.getColumn("name")?.getFilterValue()) && "pe-9"
              )}
              value={
                (table.getColumn("name")?.getFilterValue() ?? "") as string
              }
              onChange={(e) =>
                table.getColumn("name")?.setFilterValue(e.target.value)
              }
              placeholder="Search by name"
              type="text"
              aria-label="Search by name"
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/60 peer-disabled:opacity-50">
              <RiSearch2Line size={20} aria-hidden="true" />
            </div>
            {Boolean(table.getColumn("name")?.getFilterValue()) && (
              <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/60 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Clear filter"
                onClick={() => {
                  table.getColumn("name")?.setFilterValue("");
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
              >
                <RiCloseCircleLine size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Delete button */}
          {table.getSelectedRowModel().rows.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="ml-auto" variant="outline">
                  <RiDeleteBinLine
                    className="-ms-1 me-2 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  Delete
                  <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                    {table.getSelectedRowModel().rows.length}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="flex flex-col gap-2  max-sm:items-center sm:flex-row sm:gap-4">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
                    aria-hidden="true"
                  >
                    <RiErrorWarningLine className="opacity-80" size={16} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete{" "}
                      {table.getSelectedRowModel().rows.length} selected{" "}
                      {table.getSelectedRowModel().rows.length === 1
                        ? "row"
                        : "rows"}
                      .
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteRows}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {/* Filter by status */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <RiFilter3Line
                  className="-ms-1.5 me-2 text-muted-foreground/60"
                  size={20}
                  aria-hidden="true"
                />
                Filter
                {selectedStatuses.length > 0 && (
                  <span className="-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                    {selectedStatuses.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-36 p-3" align="end">
              <div className="space-y-3">
                <div className="text-xs font-medium uppercase text-muted-foreground/60">
                  Status
                </div>
                <div className="space-y-3">
                  {uniqueStatusValues.map((value, i) => (
                    <div key={value} className="flex items-center gap-2">
                      <Checkbox
                        id={`${id}-${i}`}
                        checked={selectedStatuses.includes(value)}
                        onCheckedChange={(checked: boolean) =>
                          handleStatusChange(checked, value)
                        }
                      />
                      <Label
                        htmlFor={`${id}-${i}`}
                        className="flex grow justify-between gap-2 font-normal"
                      >
                        {value}{" "}
                        <span className="ms-2 text-xs text-muted-foreground">
                          {statusCounts.get(value)}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[240px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  "Pick a date range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                selected={{
                  from: dateRange.from,
                  to: dateRange.to,
                }}
                onSelect={(range: any) => setDateRange(range)}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="outline"
            onClick={() => setShowAllPurchases(!showAllPurchases)}
          >
            {showAllPurchases ? "Show Latest Only" : "Show All Purchases"}
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table className="table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}px` }}
                    className="relative h-9 select-none bg-sidebar border-y border-border first:border-l first:rounded-l-lg last:border-r last:rounded-r-lg"
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className={cn(
                          header.column.getCanSort() &&
                            "flex h-full cursor-pointer select-none items-center gap-2"
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => {
                          // Enhanced keyboard handling for sorting
                          if (
                            header.column.getCanSort() &&
                            (e.key === "Enter" || e.key === " ")
                          ) {
                            e.preventDefault();
                            header.column.getToggleSortingHandler()?.(e);
                          }
                        }}
                        tabIndex={header.column.getCanSort() ? 0 : undefined}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <RiArrowUpSLine
                              className="shrink-0 opacity-60"
                              size={16}
                              aria-hidden="true"
                            />
                          ),
                          desc: (
                            <RiArrowDownSLine
                              className="shrink-0 opacity-60"
                              size={16}
                              aria-hidden="true"
                            />
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <tbody aria-hidden="true" className="table-row h-1"></tbody>
        <TableBody>
          {isLoading ? (
            <TableRow className="hover:bg-transparent [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-0 [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg h-px hover:bg-accent/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="last:py-0 h-[inherit]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <tbody aria-hidden="true" className="table-row h-1"></tbody>
      </Table>

      {/* Pagination */}
      {table.getRowModel().rows.length > 0 && (
        <div className="flex items-center justify-between gap-3">
          <p
            className="flex-1 whitespace-nowrap text-sm text-muted-foreground"
            aria-live="polite"
          >
            Page{" "}
            <span className="text-foreground">
              {table.getState().pagination.pageIndex + 1}
            </span>{" "}
            of <span className="text-foreground">{table.getPageCount()}</span>
          </p>
          <Pagination className="w-auto">
            <PaginationContent className="gap-3">
              <PaginationItem>
                <Button
                  variant="outline"
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Go to previous page"
                >
                  Previous
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  variant="outline"
                  className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Go to next page"
                >
                  Next
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

function RowActions({
  setData,
  data,
  item,
}: {
  setData: React.Dispatch<React.SetStateAction<Item[]>>;
  data: Item[];
  item: Item;
}) {
  const [isUpdatePending, startUpdateTransition] = useTransition();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleStatusToggle = () => {
    startUpdateTransition(() => {
      const updatedData = data.map((dataItem) => {
        if (dataItem.id === item.id) {
          return {
            ...dataItem,
            status: item.status === "Active" ? "Inactive" : "Active",
          };
        }
        return dataItem;
      });
      setData(updatedData);
    });
  };

  const handleVerifiedToggle = () => {
    startUpdateTransition(() => {
      const updatedData = data.map((dataItem) => {
        if (dataItem.id === item.id) {
          return {
            ...dataItem,
            verified: !item.verified,
          };
        }
        return dataItem;
      });
      setData(updatedData);
    });
  };

  const handleCommentToggle = async () => {
    try {
      const response = await fetch('/api/users/comment-permission', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: item.id,
          canComment: !item.canComment 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update comment permission');
      }

      startUpdateTransition(() => {
        const updatedData = data.map((dataItem) => {
          if (dataItem.id === item.id) {
            return {
              ...dataItem,
              canComment: !item.canComment,
            };
          }
          return dataItem;
        });
        setData(updatedData);
        toast.success(item.canComment ? 'User can no longer comment' : 'User can now comment');
      });
    } catch (error) {
      console.error('Error updating comment permission:', error);
      toast.error('Failed to update comment permission');
    }
  };

  const handleRoleToggle = async () => {
    try {
      const newRole = item.role === 'admin' ? 'user' : 'admin';
      const response = await fetch('/api/users/role', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: item.id,
          role: newRole
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to update role');
      }

      startUpdateTransition(() => {
        const updatedData = data.map((dataItem) => {
          if (dataItem.id === item.id) {
            return {
              ...dataItem,
              role: newRole,
            };
          }
          return dataItem;
        });
        setData(updatedData);
        toast.success(`Role updated to ${newRole}`);
      });
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error(error.message || 'Failed to update role');
    }
  };

  const handleReportToggle = async () => {
    try {
      const response = await fetch('/api/users/report-permission', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: item.id,
          canReport: !item.canReport 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update report permission');
      }

      startUpdateTransition(() => {
        const updatedData = data.map((dataItem) => {
          if (dataItem.id === item.id) {
            return {
              ...dataItem,
              canReport: !item.canReport,
            };
          }
          return dataItem;
        });
        setData(updatedData);
        toast.success(item.canReport ? 'User can no longer report' : 'User can now report');
      });
    } catch (error) {
      console.error('Error updating report permission:', error);
      toast.error('Failed to update report permission');
    }
  };

  const handleDelete = async () => {
    
    try {
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: [item.id] }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
  
      // Update local state only after successful deletion
      const updatedData = data.filter((dataItem) => dataItem.id !== item.id);
      setData(updatedData);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting user:', error);
      // You might want to show an error notification here
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-end">
            <Button
              size="icon"
              variant="ghost"
              className="shadow-none text-muted-foreground/60"
              aria-label="Edit item"
            >
              <RiMoreLine size={20} aria-hidden="true" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={handleStatusToggle}
              disabled={isUpdatePending}
            >
              {item.status === "Active"
                ? "Deactivate contact"
                : "Activate contact"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleVerifiedToggle}
              disabled={isUpdatePending}
            >
              {item.verified ? "Unverify contact" : "Verify contact"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleRoleToggle}
              disabled={isUpdatePending}
            >
              {item.role === 'admin' ? 'Change to User' : 'Change to Admin'}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center justify-between"
              disabled={isUpdatePending}
            >
              <span>Block Comments</span>
              <Switch
                checked={!item.canComment}
                onCheckedChange={handleCommentToggle}
                disabled={isUpdatePending}
                className="ml-2"
              />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center justify-between"
              disabled={isUpdatePending}
            >
              <span>Block Reporting</span>
              <Switch
                checked={!item.canReport}
                onCheckedChange={handleReportToggle}
                disabled={isUpdatePending}
                className="ml-2"
              />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive focus:text-destructive"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              contact.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdatePending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isUpdatePending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
