import React from 'react';
import styled from 'styled-components';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";

export const Table2 = ({ items }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Должность</TableCell>
            <TableCell>Оклад</TableCell>
            <TableCell>Организация разметившая вакансию</TableCell>
            <TableCell>Контактное лицо</TableCell>
            <TableCell>Телефон</TableCell>
            <TableCell>Тип занятости</TableCell>
            <TableCell>Описание вакансии</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => {
            return (
              <TableRow key={item.id}>
                <CustomTableCell component="th" scope="row">
                  {item.name}
                </CustomTableCell>
                <CustomTableCell>
                  {item.salaryFrom || item.salaryTo ? `${item.salaryFrom ? `От ${item.salaryFrom}` : "" } ${item.salaryTo ? `до ${item.salaryTo}` : ""}`  : "Не указано"}
                </CustomTableCell>
                <CustomTableCell>{item.employer || ""}</CustomTableCell>
                <CustomTableCell>{item.contact || ""}</CustomTableCell>
                <CustomTableCell>
                  {
                    item.phone.map((phone, index) => (
                      <span key={index}>
                        phone
                      </span>)
                    )
                  }

                </CustomTableCell>
                <CustomTableCell>{item.contact || ""}</CustomTableCell>
                <CustomTableCell>{item.description || ""}</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

//styled

const CustomTableCell = styled(TableCell)`
  max-width: 300px;
`;
