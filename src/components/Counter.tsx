import { createSignal, type Component, type JSX } from "solid-js"

interface Props {
  initialValue?: number;
  children: JSX.Element;
}

export const Counter:Component<Props> = (props) => {

  const [counter, setCounter] = createSignal(props?.initialValue || 0)

  const handleControllerCounter = (op: '-' | '+') => {
    setCounter(prev => op === '+' ? ++prev : --prev);
  }

  return (
    <>
      <h1>Counter</h1>
      <h3>Value: {counter()} </h3>
      <button onclick={() => handleControllerCounter('-')}>-1</button>
      <button onclick={() => handleControllerCounter('+')}>+1</button>
      <h3></h3>
    </>
  )
}
