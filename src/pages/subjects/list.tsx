import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import { ListView } from '@/components/refine-ui/views/list-view'
import { Search } from 'lucide-react'
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {DEPARTMENT_OPTIONS} from "@/constants";
import {useTable} from '@refinedev/react-table'
import {Subject} from '@/types';
import { ColumnDef } from "@tanstack/react-table";
import React from 'react'
import { Badge } from '@/components/ui/badge';

const SubjectList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const departmentFilters =
    selectedDepartment === "all"
      ? []
      : [
          {
            field: "department",
            operator: "eq" as const,
            value: selectedDepartment,
          },
        ];

  const searchFilters = searchQuery
    ? [
        {
          field: "name",
          operator: "contains" as const,
          value: searchQuery,
        },
      ]
    : [];
  const subjectTable = useTable<Subject>({
    columns: useMemo<ColumnDef<Subject>[]>(() => [
      {
        id: "code",
        accessorKey: "code",
        size: 100,
        header: ()=> <p className="column-title ml-2">Code</p>,
        cell: ({ getValue }) => <Badge >{getValue<string>()}</Badge>, 
      },
      {
        id: "name",
     header: ()=> <p className="column-title ml-2">Name</p>,
        accessorKey: "name",
            cell: ({ getValue }) => <span className="text-foreground" >{getValue<string>()}</span>, 
            filterFn: 'includesString'
      },
       {
        id: "department",
     header: ()=> <p className="column-title ml-2">Department</p>,
     size: 100,
        accessorKey: "department",
            cell: ({ getValue }) => <Badge variant="secondary" >{getValue<string>()}</Badge>, 
            filterFn: 'includesString'
      },
     {
        id: "description",
     header: ()=> <p className="column-title ml-2">Description</p>,
     size: 300,
        accessorKey: "description",
            cell: ({ getValue }) => <span className="truncated line-clamp-2" >{getValue<string>()}</span>, 
            filterFn: 'includesString'
      },

    ], []),
    refineCoreProps: {
      resource: "subjects",
      pagination:{
        pageSize: 10,
        mode: "server",
      },
      filters:{
        permanent: [...departmentFilters, ...searchFilters],
      },
      sorters:{
        initial:[
          {
           field: "id",
           order: "desc", 
          }
        ]
      },
    }
  });
  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Subjects</h1>

      <div className="intro-row">
        <p>Quick access to essential metrics and management tools.</p>

        <div className="actions-row">
          <div className="search-field">
            <Search className="search-icon" />
            <Input
              type="text"
              placeholder="Search by name..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {DEPARTMENT_OPTIONS.map((department:{ value: string; label: string }) => (
                  <SelectItem key={department.value} value={department.value}>
                    {department.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <CreateButton resource="subjects" />
          </div>
        </div>
      </div>

      <DataTable table={subjectTable} />
    </ListView>
  )
}

export default SubjectList