import React from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-buttons-dt";
import "datatables.net-buttons/js/buttons.html5.mjs";
import JSZip from "jszip";

DataTable.use(DT);
DT.Buttons.jszip(JSZip);

function DDTable({ data = [], actionPath, actionImage, 
                    hiddenColumns = [], clickableColumns = [],
                    onCellClick }) 
{
    if (!data.length) {
        return <p>No data available.</p>;
    }

    const columns = Object.keys(data[0])
        .filter((key) => !["_id", "__v", ...hiddenColumns].includes(key))
        .map((key) => ({
            data: key,
            defaultContent:"",
            createdCell: (cell, cellData) => {
                if (clickableColumns.includes(key)) {
                    cell.style.cursor = "pointer";
                    cell.style.textDecoration = "underline";
                    cell.onclick = () => onCellClick?.(cellData);
                }
            },
            title: key
                .replace(/_/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase()),
            render: (value, type, row) => {
                    if (value === undefined || value === null) return "";
                   if (typeof value === "object" && value.$numberDecimal) {
                    return Number(value.$numberDecimal).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                    });
                    }

                if (key.toLowerCase().includes("date")) {
                    return new Date(value).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric"
                    });
                }

                if (key.toLowerCase().includes("time")) {
                    return new Date(value).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                    });
                }

                return value;
            }
        }));

    if (actionPath && actionImage) {
        columns.push({
            data: null,
            title: "Action",
            orderable: false,
            searchable: false,
            render: (data, type, row) => {
                return `<a href="${actionPath(row)}">
                    <img class="editButton" src="${actionImage}" alt="Edit">
                </a>`;
            }
        });
    }

    return (
        <>
        <div className="container-fluid mt-3  text-white  align-center" style={{ height: "75vh" }}>
        <DataTable
            data={data}
            columns={columns}
            className="table dataTable table-primary table-bordered table-striped table-hover text-center"
            paging={true}
            searching={true}
            info={true}
            lengthChange={true}
            layout={{
                topStart: "pageLength",
                topEnd: "search",
                bottomStart: "info",
                bottomEnd: "paging"
            }}
            
        />
        </div>
        </>
    );
}

export default DDTable;