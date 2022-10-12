import React, { useState, useEffect } from "react";
import axios from "axios";
const Convert = () => {
  const [data, setData] = useState({});
  const [value, setValue] = useState([]);
  const [valueData, setValueData] = useState([]);
  const [input, setInput] = useState(0);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [convert, setConvert] = useState("");

  const gloable = () => {
    if (start >= end) {
      setConvert(input / start);
    } else {
      setConvert(input * start * end);
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://v6.exchangerate-api.com/v6/53c0ce19a6fcee1b4ced2baa/latest/USD`
      )
      .then((res) => {
        const itemRender = Object?.keys(res.data.conversion_rates)?.map(
          (item) => item
        );
        const itemValueRender = Object?.keys(res.data.conversion_rates)?.map(
          (item) => res.data.conversion_rates[item]
        );
        setValueData(itemValueRender);

        setValue(itemRender);
      });
  }, []);

  return (
    <>
      <div class="container">
        <h2 class="text-info fst-italic mt-5">Currency converter </h2>
        <div class="row">
          <div class="col-sm-6 mt-4">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Enter Amount"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </div>
          <div class="col-3">
            <select
              class="form-select mt-4"
              ria-label="Default select example"
              onChange={(e) => setStart(e.target.value, "vvv")}
            >
              <option selected> select countries</option>
              {value.length > 0 && valueData.length > 0
                ? value.map((item, index) => (
                    <option value={valueData[index]}>{item} </option>
                  ))
                : null}
            </select>
          </div>
          <div class="col-sm-3">
            <select
              class="form-select mt-4"
              aria-label="Default select example"
              onChange={(e) => setEnd(e.target.value, "vvv")}
            >
              <option selected> select countries</option>
              {value.length > 0 && valueData.length > 0
                ? value.map((item, index) => (
                    <option value={valueData[index]}>{item} </option>
                  ))
                : null}
            </select>
          </div>
        </div>
      </div>
      <button
        onClick={gloable}
        type="button"
        class="btn btn-outline-success mt-5"
      >
        Convert
      </button>
      <div class="container">
        <div class="row">
          <div class="col-sm-4"></div>
          <div class="col-sm-4">
            <div class="form-group">
              <label
                class="text-warning fst-italic mt-3"
                for="exampleInputEmail1"
              >
                Converted Amount:
              </label>
              <input
                className="rounded mt-3"
                type="text"
                class="form-control"
                placeholder="Converted Amount"
                value={convert}
              />
            </div>
          </div>
          <div class="col-sm-4"></div>
        </div>
      </div>
    </>
  );
};

export default Convert;
