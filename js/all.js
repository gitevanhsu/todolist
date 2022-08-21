console.clear()
const root = ReactDOM.createRoot(document.querySelector('#todoListPage'));
const { useState, } = React
function App(){
  // get and update input value
  const [ value, setValue ] = useState('')
  // console.log(value)

  // record list item 
  const [ items, setItems ] = useState([
    { 
      todo: "把冰箱發霉的檸檬拿去丟",
      checked: false,
    },
    {
      todo: "打電話叫媽媽匯款給我",
      checked: false,
    },
    {
      todo: "整理電腦資料夾",
      checked: false,
    },
    {
      todo: "繳電費水費瓦斯費",
      checked: false,
    },
    {
      todo: "約vicky禮拜三泡溫泉",
      checked: false,
    },
    {
      todo: "約ada禮拜四吃晚餐",
      checked: false,
    }
  ])
  // save input data 
  function saveInput(e){
    setValue(e.target.value) 
  }

  // update list
  function updateList() {
    // save the data
    setItems([...items, { checked:false ,todo: value }] )
    setUnDoList( [...items, { checked:false ,todo: value }] ) 
    // after save data, clear input value
    setValue('')
  }
  
  // remove item
  function removeItem(e){
    // console.log(e.target.parentNode.parentNode.className)
    const temp = e.target.parentNode.parentNode.className
    setItems(items.filter( item => item.todo !== temp))
    setUnDoList( items.filter(item => !item.checked) ) 
  }
  const [unDoList, setUnDoList] = useState([...items])
  

  // did list
  const [didList, setDidList] = useState([])
  // save the did item
  function updateDidList(e){
    setItems(items.map( item => {
      if (item.todo === e.target.parentNode.parentNode.className){
        item.checked = !item.checked
      }
      setDidList( items.filter(item => item.checked) )
      setUnDoList( items.filter(item => !item.checked) ) 
      return item
    }))
  }

  // show list
  function ShowItem() {
    return (
      items.map((item, index) => {
        // console.log(item, index)
        return(
          <li key={index} className={item.todo}>
            <label className="todoList_label">
              <input className="todoList_input" type="checkbox" value="true" checked={item.checked}  onChange={updateDidList}/>
              <span >{item.todo}</span>
            </label>
            <a href="#">
              <i className="fa fa-times" onClick={removeItem}></i>
            </a>
          </li>
        )
      })
    )
  }
  function ShowUndo() {
    return (
      unDoList.map((item, index) => {
        // console.log(item, index)
        return(
          <li key={index} className={item.todo}>
            <label className="todoList_label">
              <input className="todoList_input" type="checkbox" value="true" checked={item.checked}  onChange={updateDidList}/>
              <span >{item.todo}</span>
            </label>
            <a href="#">
              <i className="fa fa-times" onClick={removeItem}></i>
            </a>
          </li>
        )
      })
    )
  }
  function ShowDid() {
    return (
      didList.map((item, index) => {
        // console.log(item, index)
        return(
          <li key={index} className={item.todo}>
            <label className="todoList_label">
              <input className="todoList_input" type="checkbox" value="true" checked={item.checked}  onChange={updateDidList}/>
              <span >{item.todo}</span>
            </label>
            <a href="#">
              <i className="fa fa-times" onClick={removeItem}></i>
            </a>
          </li>
        )
      })
    )
  }
  const [ pages, setPages ] = useState([
    {
      id : 'page1',
      class : 'active'
    },
    {
      id : 'page2',
      class : ''
    },
    {
      id : 'page3',
      class : ''
    }
  ])


  function changeStatus(e) {
    setPages(pages.map( page => {
      if ( page.id === e.target.id ) {
        return (
          {id: page.id, class: 'active'}
        )
      } else return  {id: page.id, class: ''}
    }))
  }

  function Show() {
    if (pages[0].class === "active") {
      return <ShowItem />
    } else if (pages[1].class === "active") {
      return <ShowUndo />
    } else if (pages[2].class === "active") {
      return <ShowDid />
  }
  }

  function clearDid (){
    setItems(items.filter(item => !item.checked))
    setDidList([])
  }


  return (
    <div id="todoListPage" className="bg-half">
      <nav>
          <h1><a href="#">ONLINE TODO LIST</a></h1>
        </nav>
        <div className="conatiner todoListPage vhContainer">
          <div className="todoList_Content">
            <div className="inputBox">
              <input value={value} type="text" placeholder="請輸入待辦事項" onChange={saveInput}/>
              <a href="#">
                <i className="fa fa-plus" style={{"cursor":"pointer"}} onClick={updateList}></i>
              </a>
            </div>
            <div className="todoList_list">
              <ul className="todoList_tab">
                <li><a id='page1' href="#" className={pages[0].class} onClick={changeStatus} >全部</a></li>
                <li><a id='page2' href="#" className={pages[1].class} onClick={changeStatus} >待完成</a></li>
                <li><a id='page3' href="#" className={pages[2].class} onClick={changeStatus} >已完成</a></li>
              </ul>
              <div className="todoList_items">
                <ul className="todoList_item">
                  <Show/>
                </ul>
                <div className="todoList_statistics">
                  <p> {unDoList.length} 個待完成項目</p>
                  <a href="#" onClick={clearDid}>清除已完成項目</a>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

root.render(<App/>)