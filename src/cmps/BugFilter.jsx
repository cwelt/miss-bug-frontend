import { bugService } from "../services/bug.service.js";
import { useState, useEffect } from "react";

export function BugFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });

  useEffect(() => {
    onSetFilterBy(filterByToEdit); // Notify parent
  }, [filterByToEdit]);

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value || "";
        break;

      default:
        break;
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  {
    /* Optional support for LAZY Filtering with a button */
  }
  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilterBy(filterByToEdit);
  }

  const { title, minSeverity, maxSeverity, description } = filterByToEdit;

  return (
    <section className="bug-filter">
      <h2>Filter Bugs</h2>
      <form onSubmit={onSubmitFilter}>
        {/* title */}
        <label htmlFor="title">Title: </label>
        <input
          value={title}
          onChange={handleChange}
          type="text"
          placeholder="By Bug Title"
          id="title"
          name="title"
        />
        {/* description */}
        <label htmlFor="description">Description: </label>
        <input
          value={description}
          onChange={handleChange}
          type="text"
          placeholder="By Bug Description"
          id="description"
          name="description"
        />
        {/* Min Severity */}
        <label htmlFor="minSeverity">Min Severity:</label>
        <input
          type="number"
          id="minSeverity"
          name="minSeverity"
          min="1"
          max="5"
          value={minSeverity}
          onChange={handleChange}
        />
        {/* Max Severity */}
        <label htmlFor="maxSeverity">Max Severity:</label>
        <input
          type="number"
          id="maxSeverity"
          name="maxSeverity"
          min="1"
          max="5"
          value={maxSeverity}
          onChange={handleChange}
        />
        <button hidden>Set Filter</button>
      </form>
    </section>
  );
}
