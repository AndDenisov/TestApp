import React from 'react';
import styled from 'styled-components';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";

export const AdvancedTable = ({ items }) => {
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
                  {item.salary ? `От ${item.salary.from} до ${item.salary.to}` : "Не указано"}
                </CustomTableCell>
                <CustomTableCell>{item.department.name}</CustomTableCell>
                <CustomTableCell>{item.contacts.name}</CustomTableCell>
                <CustomTableCell>
                  {
                    item.contacts.phones.map((phone, index) => (
                      <span key={index}>
                        {`+${phone.country}-${phone.city}-${phone.number}`}<br/>
                      </span>)
                    )
                  }

                </CustomTableCell>
                <CustomTableCell>{item.contacts.employment || ""}</CustomTableCell>
                <CustomTableCell>{item.snippet.responsibility}</CustomTableCell>
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
