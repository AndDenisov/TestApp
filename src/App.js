import React, { Component } from 'react';
import axios from "axios";
import { CircularProgress, Snackbar } from '@material-ui/core';
import { AdvancedTable, Filter, Table2 } from "./components";

const backItems = JSON.parse(`[
  {
    "name": "Системный администратор",
    "salaryFrom": null,
    "salaryTo": null,
    "employer": "ГЕРМЕС",
    "contact": "Азаров Алексей Константинович",
    "description": "Обеспечение бесперебойной работы оборудования. Закупка комплектующих и расходников. Поддержка ЛВС, IP-телефонии, обслуживание оргтехники, работа с компьютерами под управлением ОС...",
    "phone": [
      "79914119447"
    ]
  },
  {
    "name": "Специалист call-центра",
    "salaryFrom": null,
    "salaryTo": null,
    "employer": "DocDoc.ru",
    "contact": "Подолина Татьяна ",
    "description": "Прием входящих звонков/исходящие звонки по заявкам с сайта. Помощь клиенту в подборе мед. клиники или врача из существующей базы. ",
    "phone": [
      "79100460303"
    ]
  },
  {
    "name": "Консультант контактного центра",
    "salaryFrom": null,
    "salaryTo": null,
    "employer": "Билайн",
    "contact": "Болог Дарья Юрьевна",
    "description": "Помогать нашим корпоративным клиентам в обслуживании их бизнеса. Отвечать на вопросы клиентов по телефону, e-mail и в личном кабинете.",
    "phone": [
      "79612976050"
    ]
  },
  {
    "name": "Сетевой инженер",
    "salaryFrom": null,
    "salaryTo": null,
    "employer": "АЛЬФАСАТКОМ",
    "contact": "Мартынов Александр ",
    "description": "Поддержка сети передачи данных. Поддержка компьютерной сети компании.",
    "phone": [
      "79166985055"
    ]
  },
  {
    "name": "Специалист отдела по обслуживанию физических лиц",
    "salaryFrom": null,
    "salaryTo": null,
    "employer": "Билайн",
    "contact": "Болог Дарья Юрьевна",
    "description": "Отвечать на вопросы клиентов по работе сервисов компании (домашний интернет и цифровое ТВ). Помогать клиенту подобрать самые удобные продукты и...",
    "phone": [
      "79612976050"
    ]
  }
]`);

const file = JSON.parse(JSON.stringify({
    "pages": 184,
    "arguments": null,
    "clusters": null,
    "per_page": 1,
    "alternate_url": "https://hh.ru/search/vacancy?area=43&specialization=1&items_on_page=1&enable_snippets=true",
    "page": 0,
    "found": 184,
    "items": [
        {
            "area": {
                "url": "https://api.hh.ru/areas/43",
                "id": "43",
                "name": "Калуга"
            },
            "salary": {
                "gross": true,
                "from": 26000,
                "to": 35000,
                "currency": "RUR"
            },
            "premium": false,
            "response_letter_required": false,
            "type": {
                "id": "open",
                "name": "Открытая"
            },
            "published_at": "2018-10-17T21:26:36+0300",
            "employer": {
                "alternate_url": "https://hh.ru/employer/4934",
                "trusted": true,
                "id": "4934",
                "logo_urls": {
                    "90": "https://hhcdn.ru/employer-logo/1057274.jpeg",
                    "240": "https://hhcdn.ru/employer-logo/1057275.jpeg",
                    "original": "https://hhcdn.ru/employer-logo-original/231258.jpg"
                },
                "url": "https://api.hh.ru/employers/4934",
                "name": "Билайн",
                "vacancies_url": "https://api.hh.ru/vacancies?employer_id=4934"
            },
            "snippet": {
                "responsibility": "Помогать нашим клиентам разобраться с услугами мобильной связи. Делиться своей экспертизой и знаниями, консультируя клиентов и помогая им решать самые...",
                "requirement": "Я общительный и любознательный. Нахожу плюсы в любой ситуации и заряжаю позитивом окружающих меня людей. Умею найти выход в самой..."
            },
            "id": "27221203",
            "url": "https://api.hh.ru/vacancies/27221203?host=career.ru",
            "name": "Оператор Колл-центра (Без опыта)",
            "apply_alternate_url": "https://hh.ru/applicant/vacancy_response?vacancyId=27221203",
            "contacts": {
                "email": "dbolog@rnd.beeline.ru",
                "phones": [
                    {
                        "comment": null,
                        "country": "7",
                        "number": "2976050",
                        "city": "961"
                    }
                ],
                "name": "Болог Дарья Юрьевна"
            },
            "address": {
                "metro": null,
                "id": "176286",
                "lng": 0,
                "raw": "Калуга, ул.Московская, д.289",
                "lat": 0,
                "description": null,
                "street": null,
                "metro_stations": [],
                "city": null,
                "building": null
            },
            "created_at": "2018-10-17T21:26:36+0300",
            "alternate_url": "https://career.ru/vacancy/27221203",
            "has_test": false,
            "response_url": null,
            "relations": [],
            "sort_point_distance": null,
            "archived": false,
            "department": {
                "id": "bil-4934-beel",
                "name": "Билайн"
            }
        }
    ]
}));

class App extends Component {
  state = {
    search: "",
    initialItems: [],
    initialItems2: [],
    items: [],
    items2: [],
    loading2: true,
    loading: true,
    error: "",
    error2: ""
  };
  
  async componentDidMount(){
    try{
      const { data } = await axios.get("127.0.0.1:8080/GetMapping");
      this.setState({
        loading: false,
        initialItems: data.items,
        items: data.items
      })
    }catch (e) {
      console.error(e.message);
      this.setState({
        loading: false,
        error: e.message
      })
    }
    try{
      const { data } = await axios.get("http://localhost:8080/fromdb")
      this.setState({
        loading2: false,
        initialItems2: data.items,
        items2: data.items
      })
    }catch (e) {
      console.error(e.message);
      this.setState({
        loading2: false,
        error2: e.message
      })
    }
  }
  
  handleSearchChanged = e => {
    const { value } = e.target;
    const { items, initialItems, items2, initialItems2 } = this.state;
    this.setState({search: value, items: value ? this.filterItems(value, items) : initialItems, items2: value ? this.filterItems(value, items2) : initialItems2})
  };
  
  filterItems = (value, items) => items.filter(item => {
    const itemValues = Object.values(item);
    return itemValues.some(val => typeof val === "string" && val.includes(value));
  });
  
  handleClose = () => {
    this.setState({error: ""})
  };
  
  render() {
    const { search, items, loading, error, items2, loading2, error2 } = this.state;
    return loading || loading2 ?
      <CircularProgress/> :
      (
        <>
          <Filter value={search} onSearchChanged={this.handleSearchChanged} />
          <AdvancedTable items={items} />
          <Table2 items={items2} />
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={!!error || !!error2}
            onClose={this.handleClose}
            message={<span id="message-id">{error || "Произошла ошибка. Попробуйте перезагрузить страницу"}</span>}
          />
        </>
      )
  }
}

export default App;
