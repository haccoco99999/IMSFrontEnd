import React from 'react'
export const CustomToggleList = ({
    columns,
    onColumnToggle,
    toggles
  }) => (

    <div className=" collapse btn-group btn-group-toggle btn-group-vertical" id="collapseExample" data-toggle="buttons">
      {
        columns
          .map(column => ({
            ...column,
            toggle: toggles[column.dataField]
          }))
          .map((column, index) => (

            <div class="form-check form-switch">
              <input
                key={column.dataField}
                className={`form-check-input ${column.toggle ? 'active' : ''}`}
                data-toggle="button"
                checked={column.toggle}
                type="checkbox"
                aria-pressed={column.toggle ? 'true' : 'false'}
                id={"flexSwitchCheckDefault" + index}
                onClick={() => onColumnToggle(column.dataField)}
              />
              <label class="form-check-label" for={"flexSwitchCheckDefault" + index}>{column.text}</label>

            </div>

          ))
      }
    </div>
  );