import React from 'react';
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
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>
                  {item.salary ? `От ${item.salary.from} до ${item.salary.to}` : "Не указано"}
                </TableCell>
                <TableCell>{item.department.name}</TableCell>
                <TableCell>{item.contacts.name}</TableCell>
                <TableCell>
                  {
                    item.contacts.phones.map((phone, index) => (
                      <span key={index}>
                        {`+${phone.country}-${phone.city}-${phone.number}`}<br/>
                      </span>)
                    )
                  }

                </TableCell>
                <TableCell>{item.contacts.name}</TableCell>
                <TableCell>{item.snippet.responsibility}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}
