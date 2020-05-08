import React, { useState } from 'react';
import{ DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from 'uuid/v4'

const itemsFromBe = [
  {id: uuid(), content: "First Item" },
  {id: uuid(), content: "Second Item" }
]

const columnsFromBe =
  {
    [uuid()]: {
      name: 'Todo',
      items: itemsFromBe
    }
  }

function App() {
  const [columns, setColumns] = useState(columnsFromBe);
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
    }} >
      <DragDropContext onDragEnd={result => console.log(result)}>
        {Object.entries(columns.map(([id, column]) => {
          return (
            <Droppable droppableId={id} key={id}>
              {(provided, snapshot) => {
                return (
                  <div 
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver ? 'lightblue' : 'lightgray',
                    padding: 4,
                    width: 250,
                    minHeight: 500
                  }}
                  >
                    {column.items.map((item, index) => {
                      return (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => {
                            return (
                              <div ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: 'none',
                                padding: 16,
                                margin: '0 0 8px, 0',
                                minHeight: '50px',
                                backgroundColor: snapshot.isDragging ? '#263b4a' : '#456C86',
                                color: 'white',
                                ...provided.draggableProps.style
                              }}
                              >
                                {item.content}
                              </div>
                            )
                          }}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                    </div>
                )
              }}

            </Droppable>
          )
        }))}
      </DragDropContext>
    </div>
  );
}

export default App;
