"use client"

import { useTable, useGlobalFilter, usePagination, Column } from 'react-table';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Icons } from '@/components/shared/icons';
import { User } from '@prisma/client';
import { getSession } from 'next-auth/react';


interface SettingsTeamFormProps {
  data: [];
  onInvite: (userId: string) => void;
}

export function SettingsTeam({ data, onInvite }: SettingsTeamFormProps) {
    // todo: 需要根据data的内容处理每行数据，并且需要获取invitation的信息
  const columns: Column<User>[] = useMemo(
    () => [
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Actions',
            accessor: 'id',
            // todo: 需要处理邀请成员的逻辑
            Cell: ({ row }: { row: { original: User } }) => (
                <button
                    onClick={() => onInvite(row.original.id)}
                    disabled={row.original.invited}
                    className={`px-4 py-2 text-white ${row.original.invited ? 'bg-gray-400' : 'bg-blue-500'}`}
                >
                    {row.original.invited ? 'Invited' : 'Invite'}
                </button>
            ),
        },
    ],
    [onInvite]
);

const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
} = useTable<User>({ columns, data });

// todo: 需要处理邀请成员的逻辑
return (
    <div>
    <div className="flex-1 flex justify-end">
        <Button>Invite Member</Button>
    </div>
    <div>
    <table {...getTableProps()} className="min-w-full bg-white border-collapse">
        <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()} className="px-4 py-2 border-b text-left">
                            {column.render('Header')}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()} className="hover:bg-gray-100">
                        {row.cells.map(cell => (
                            <td {...cell.getCellProps()} className="px-4 py-2 border-b">
                                {cell.render('Cell')}
                            </td>
                        ))}
                    </tr>
                );
            })}
        </tbody>
    </table>
    </div>
    </div>
  )
}