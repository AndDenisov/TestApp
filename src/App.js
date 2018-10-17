import React, { Component } from 'react';
import axios from "axios";
import { CircularProgress, Snackbar } from '@material-ui/core';
import { AdvancedTable, Filter } from "./components";

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
    items: [],
    loading: true,
    error: ""
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
  }
  
  handleSearchChanged = e => {
    const { value } = e.target;
    const { items, initialItems } = this.state;
    this.setState({search: value, items: value ? this.filterItems(value, items) : initialItems})
  };
  
  filterItems = (value, items) => items.filter(item => {
    const itemValues = Object.values(item);
    return itemValues.some(val => typeof val === "string" && val.includes(value));
  });
  
  handleClose = () => {
    this.setState({error: ""})
  }
  
  render() {
    const { search, items, loading, error } = this.state;
    return loading ?
      <CircularProgress/> :
      (
        <>
          <Filter value={search} onSearchChanged={this.handleSearchChanged} />
          <AdvancedTable items={items} />
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={!!error}
            onClose={this.handleClose}
            message={<span id="message-id">{error || "Произошла ошибка. Попробуйте перезагрузить страницу"}</span>}
          />
        </>
      )
  }
}

export default App;
