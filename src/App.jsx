import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';

export function App() {
  const [newTask, setNewTask] = useState('');

  const [tasks, setTasks] = useState(() => ({
    'Important & Urgent': [{ id: crypto.randomUUID(), content: 'Finish client presentation' }],
    'Important & Not Urgent': [{ id: crypto.randomUUID(), content: 'Plan Q3 strategy meeting' }],
    'Not Important & Urgent': [{ id: crypto.randomUUID(), content: 'Respond to routine emails' }],
    'Not Important & Not Urgent': [{ id: crypto.randomUUID(), content: 'Clear spam emails' }],
  }));

  const quadrantColors = {
    'Important & Urgent': '#14532D',          
    'Important & Not Urgent': '#7AC17B',     
    'Not Important & Urgent': '#5562EB',      
    'Not Important & Not Urgent': '#C2CAF9',  
  };

  const quadrantFontColors = {
    'Important & Urgent': '#FFFFFF',          
    'Important & Not Urgent': '#333333',     
    'Not Important & Urgent': '#FFFFFF',      
    'Not Important & Not Urgent': '#333333',  
  };

  const quadrants = [
    'Important & Urgent',
    'Important & Not Urgent',
    'Not Important & Urgent',
    'Not Important & Not Urgent',
  ];

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    setTasks(prevTasks => {
      if (source.droppableId === destination.droppableId) {
        const updatedTasks = Array.from(prevTasks[source.droppableId]);
        const [movedTask] = updatedTasks.splice(source.index, 1);
        updatedTasks.splice(destination.index, 0, movedTask);

        return {
          ...prevTasks,
          [source.droppableId]: updatedTasks,
        };
      }

      const sourceTasks = Array.from(prevTasks[source.droppableId]);
      const [movedTask] = sourceTasks.splice(source.index, 1);

      const destinationTasks = Array.from(prevTasks[destination.droppableId]);
      destinationTasks.splice(destination.index, 0, movedTask);

      return {
        ...prevTasks,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destinationTasks,
      };
    });
  };

  const addTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: crypto.randomUUID(),
      content: newTask,
    };

    setTasks(prev => ({
      ...prev,
      'Important & Urgent': [task, ...prev['Important & Urgent']],
    }));

    setNewTask('');
  };

  const deleteTask = (quadrant, taskId) => {
    setTasks(prev => ({
      ...prev,
      [quadrant]: prev[quadrant].filter(task => task.id !== taskId),
    }));
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 py-6" 
      style={{ backgroundColor: '#F3F6FF', fontFamily: 'Poppins, sans-serif', boxSizing: 'border-box' }}
    >
      <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#333333' }}>
        Build Your Own Eisenhower Matrix
      </h1>

      <div className="flex gap-2 mb-8 w-full max-w-2xl">
        <input
          className="flex-grow p-3 rounded shadow-sm border"
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ borderColor: '#C2CAF9' }}
        />
        <button
          className="text-white px-6 py-3 rounded font-bold transition-colors duration-300"
          style={{ backgroundColor: '#5562EB' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C2CAF9'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5562EB'}
          onClick={addTask}
        >
          Add
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-2 gap-4 max-w-4xl w-full">
          {quadrants.map((quad) => (
            <Droppable droppableId={quad} key={quad}>
              {(provided) => (
                <div
                  className="rounded-2xl shadow p-4 flex flex-col"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ backgroundColor: quadrantColors[quad], minHeight: '220px' }}
                >
                  <h2 className="font-semibold text-lg mb-3 border-b pb-1" style={{ color: quadrantFontColors[quad] }}>
                    {quad}
                  </h2>
                  <div className="flex-grow overflow-auto">
                    {tasks[quad].map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <motion.div
                            initial={{ opacity: 0.9 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className={`p-2 mb-2 rounded-lg shadow-sm flex justify-between items-center ${
                              snapshot.isDragging ? 'bg-white' : 'bg-white/90'
                            }`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <span style={{ color: quadrantFontColors[quad] }}>{task.content}</span>
                            <button className="font-bold ml-2" style={{ color: '#5562EB' }} onClick={() => deleteTask(quad, task.id)}>
                              ×
                            </button>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <a
        href="https://cta-service-cms2.hubspot.com/web-interactives/public/v1/track/redirect?encryptedPayload=AVxigLKyLjpsggTUVyNU8h7d9fUOvFj6mV%2FXQmCjaEXIUs2lDVUOWWPGaJhdAFnaJ%2BkwqpDHGQ6n96aL4PKVYTrFkyACjreKGKPft0LxRsO9qlArmukZMLM8aY6HrTxZzqKDbsMXB%2FgAMG5tPTp3Zm2E2gW%2FoXy2nZU9vFpzPXtCmJ%2Bf%2Bc%2FFT4eEG4c%3D&webInteractiveContentId=192661860514&portalId=22398006"
        target="_blank"
        rel="noopener"
        className="mt-8 inline-block"
      >
        <img
          alt="Create a free AI calendar account →"
          loading="lazy"
          src="https://no-cache.hubspot.com/cta/default/22398006/interactive-192661860514.png"
          className="rounded transition-opacity duration-300 hover:opacity-80"
        />
      </a>
    </div>
  );
}
