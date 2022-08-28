console.clear()
const root = ReactDOM.createRoot(document.querySelector('#todoListPage'));
const { useState, } = React
function App(){
  // get and update input value
  const [ value, setValue ] = useState('')
  const [ id, setId ] = useState()
  // console.log(value)

  // record list item 
  const [ items, setItems ] = useState([
    { 
      id: "0",
      todo: "把冰箱發霉的檸檬拿去丟",
      checked: false,
    },
    {
      id: "1",
      todo: "打電話叫媽媽匯款給我",
      checked: false,
    },
    {
      id: "2",
      todo: "整理電腦資料夾",
      checked: false,
    },
    {
      id: "3",
      todo: "繳電費水費瓦斯費",
      checked: false,
    },
    {
      id: "4",
      todo: "約vicky禮拜三泡溫泉",
      checked: false,
    },
    {
      id: "5",
      todo: "約ada禮拜四吃晚餐",
      checked: false,
    }
  ])
  // save input data 
  function saveInput(e){
    const value = e.target.value
    const id = e.target.className
    setValue(value)
    setId(id)
  }

  // update list
  function updateList() {
    // save the data
    if (value.trim().length === 0) {
      alert('請輸入項目')
      setValue('')
    } else {
      setItems([...items, { id ,todo: value, checked:false }] )
      setUnDoList( [...items, { id, checked:false ,todo: value }] ) 
      // after save data, clear input value
      setValue('')
    }
  }
  
  // remove item
  function removeItem(e){
    const temp = e.target.parentNode.parentNode
    setItems( items.filter(item => item.id !== temp.id))
    setUnDoList( unDoList.filter(item => item.id !== temp.id))
    setDidList( didList.filter(item => item.id !== temp.id))
  }
  const [unDoList, setUnDoList] = useState([...items])
  

  // did list
  const [didList, setDidList] = useState([])
  // save the did item
  function updateDidList(e){
    setItems(items.map( item => {
      if (item.todo === e.target.parentNode.parentNode.className && item.id === e.target.parentNode.parentNode.id){
        item.checked = !item.checked
      }
      setDidList( items.filter(item => item.checked))
      setUnDoList( items.filter(item => !item.checked))
      return item
    }))
  }

  // show list
  function ShowItem() {
    if (items.length === 0) {
      return (
        <b>目前暫無待辦事項</b>
      )
    } else {
      return (
        items.map((item, index) => {
          // console.log(item, index)
          return(
            <li key={index} className={item.todo} id={item.id}>
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
  }
  function ShowUndo() {
    if (unDoList.length === 0){
      return (
        <b>目前暫無待辦事項</b>
      )
    } else {
      return (
        unDoList.map((item, index) => {
          // console.log(item, index)
          return(
            <li key={index} className={item.todo} id={item.id}>
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
    
  }
  function ShowDid() {
    if (didList.length === 0){
      return (
        <b>目前尚未完成代辦事項</b>
      )
    }
    return (
      didList.map((item, index) => {
        // console.log(item, index)
        return(
          <li key={index} className={item.todo} id={item.id}>
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
              <input className={items.length} value={value} type="text" placeholder="請輸入待辦事項" onChange={saveInput}/>
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