import React from "react";
import { useAsync } from "react-async-hook";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "./Table.css"

export default function Table() {
  const getData = async () => {
    return (await fetch(`https://plovput.li-st.net/getObjekti/`)).json();
  };

  const Table = () => {
    const asyncPorts = useAsync(getData);
    const columns = [
      // { dataField: "id", text: "Id", sort: true },
      { dataField: "kapetanija", text: "Lučka kapetanija", sort: true },
      { dataField: "objekt", text: "Naziv objekta", sort: true },
      { dataField: "psbroj", text: "PS broj", sort: true },
      { dataField: "ebroj", text: "E broj", sort: true },
      { dataField: "naziv", text: "Naziv objekta", sort: true },
      { dataField: "tip", text: "Tip objekta", sort: true },
    ];

    const defaultSorted = [
      {
        dataField: "kapetanija",
        order: "asc",
      },
    ];

    const pagination = paginationFactory({
      page: 1,
      sizePerPage: 10,
      sizePerPageList: [10, 25, 50, 100, 250, 500],
      lastPageText: ">>",
      firstPageText: "<<",
      nextPageText: ">",
      prePageText: "<",
      showTotal: true,
      alwaysShowAllBtns: true,
      // onPageChange: function (page, sizePerPage) {
      //   console.log("page", page);
      //   console.log("sizePerPage", sizePerPage);
      // },
      // onSizePerPageChange: function (page, sizePerPage) {
      //   console.log("page", page);
      //   console.log("sizePerPage", sizePerPage);
      // },
    });

    return (
      <div className="App">
        {asyncPorts.loading && <div className="loader">Dohvat podataka...</div>}
        {asyncPorts.error && (
          <div className="error">
            {`Došlo je do pogreške prilikom dohvata podataka - (${asyncPorts.error.message})`}
            <p>Molimo pokušajte kasnije.</p>
          </div>
        )}
        {asyncPorts.result && (
          <BootstrapTable
            bootstrap4
            // keyField = "id"
            keyField = "objekt"
            data = {asyncPorts.result.features.map((port) => ({
              // key: port.properties.pk,
              kapetanija: port.properties.lucka_kapetanija,
              objekt: port.properties.naziv_objekta,
              psbroj: port.properties.ps_br,
              ebroj: port.properties.e_br,
              naziv: port.properties.naziv_objekta,
              tip: port.properties.tip_objekta,
            }))}
            columns={columns}
            defaultSorted={defaultSorted}
            pagination={pagination}
          />
        )}
      </div>
    );
  };
  return Table();
}