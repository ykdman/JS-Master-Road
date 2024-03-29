// class DOMHelper {
//   static moveElement(elementId, newDestinationSelector) {
//     const targetElement = document.getElementById(elementId);
//     const newParentElement = document.querySelector(newDestinationSelector);

//     newParentElement.append(targetElement);
//   }

//   static clearEventListners(element) {
//     const cloneElement = element.cloneNode(true);
//     element.replaceWith(cloneElement);
//     return cloneElement;
//   }
// }
// class Component {
//   detach() {
//     if (this.element) {
//       this.element.remove();
//     }
//   }

//   attach() {
//     document.body.append(this.element);
//   }
// }
// class Tooltip {
//   detach() {
//     this.element.remove();
//   }

//   attach() {
//     const tooltipElement = document.createElement('div');
//     tooltipElement.className = 'card';
//     tooltipElement.textContent = 'DUMMY!';
//     tooltipElement.addEventListener('click', this.detach.bind(this));
//     this.element = tooltipElement;
//     document.body.append(tooltipElement);
//   }
// }

// class ProjectItem {
//   hasActiveTooltip = false;

//   constructor(id, updateProjectListsFunction, type) {
//     this.id = id;
//     this.updateProjectListsHandler = updateProjectListsFunction;
//     this.connectMoreInfoButton();
//     this.connectSwitchButton(type);
//   }

//   connectSwitchButton(type) {
//     const projectItemElement = document.getElementById(this.id);
//     let switchButton = projectItemElement.querySelector('button:last-of-type');
//     switchButton = DOMHelper.clearEventListners(switchButton);
//     switchButton.textContent = type === 'active' ? 'Finish' : 'Activate';
//     switchButton.addEventListener(
//       'click',
//       this.updateProjectListsHandler.bind(this, this.id)
//     );
//   }

//   update(updateProjectListsFunction, type) {
//     this.updateProjectListsHandler = updateProjectListsFunction;
//     this.connectSwitchButton(type);
//   }

//   showMoreInfoHandler() {
//     if (this.hasActiveTooltip) {
//       return;
//     }
//     const tooltip = new Tooltip();
//     tooltip.attach();
//     this.hasActiveTooltip = true;
//   }

//   connectMoreInfoButton() {
//     const projectItemElement = document.getElementById(this.id);
//     let moreInfoButton = projectItemElement.querySelector(
//       'button:first-of-type'
//     );
//     moreInfoButton = DOMHelper.clearEventListners(moreInfoButton);
//     moreInfoButton.addEventListener('click', this.showMoreInfoHandler);
//   }
// }

// class ProjectList {
//   // property 로 전환된다.
//   projects = [];

//   constructor(type) {
//     this.type = type;
//     const prjItems = document.querySelectorAll(`#${type}-projects li`);
//     for (const prjItem of prjItems) {
//       this.projects.push(
//         new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
//       );
//     }
//     console.log(this.projects);
//   }

//   setSwitchHandlerFunction(switchHandlerFunction) {
//     this.switchHandler = switchHandlerFunction;
//   }

//   addProject(project) {
//     /** addProject 함수의 this는 흐름상
//      * activeProject 또는 finishedPrject를 참조하는데
//      * activeProject 일 때는 finishedProject를
//      * finishedProject 일 때는 activePrject를 참조한다.
//      * 그 이유는, 서로 다른 인스턴스상에서 자신의 addProject 메소드가 아닌
//      * 서로의 addProject 메소드를 호출해야하기 때문이다.*/
//     this.projects.push(project);
//     DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
//     project.update(this.switchProject.bind(this), this.type);
//   }

//   switchProject(projectId) {
//     // this = 본인 스스로를 참조
//     console.log(projectId);
//     this.switchHandler(this.projects.find((prj) => prj.id === projectId));
//     this.projects = this.projects.filter((prj) => prj.id !== projectId);
//   }
// }

// class App {
//   static init() {
//     const activeProjectList = new ProjectList('active');
//     const finishedProjectList = new ProjectList('finished');

//     activeProjectList.setSwitchHandlerFunction(
//       finishedProjectList.addProject.bind(finishedProjectList)
//     );
//     finishedProjectList.setSwitchHandlerFunction(
//       activeProjectList.addProject.bind(activeProjectList)
//     );
//   }
// }

// /**
//  * Run
//  */
// App.init();
class DOMHelper {
  /**
   *
   * @description 인수 Element를 Clone 하여 할당된 이벤트 리스너들을 모두 제거한 복제본을 재할당하는 함수
   */
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  /**
   * @description Target Element를 새로운 부모 노드의 자식으로 추가하는 함수
   */
  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
    element.scrollIntoView({ behavior: 'smooth' }); // scrollIntoView()가 호출 된 요소가 사용자에게 표시되도록 요소의 상위 컨테이너를 스크롤합니다.
  }
}

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }

    this.insertBefore = insertBefore;
  }

  detach() {
    if (this.element) {
      this.element.remove();
      // this.element.parentElement.removeChild(this.element);
    }
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
}

class Tooltip extends Component {
  constructor(closeNotifierFunction, tooltipText, hostElementID) {
    super(hostElementID);
    this.closeNotifier = closeNotifierFunction;
    this.text = tooltipText;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  create() {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';
    const tooltipTemplate = document.getElementById('tooltip');
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    tooltipBody.querySelector('p').textContent = this.text;
    tooltipElement.append(tooltipBody);

    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElPosHeight = this.hostElement.offsetHeight;
    const parentElementScrolling = this.hostElement.parentElement.scrollTop; // Project ul에서 얼마나 스크롤 했는지를 출력

    const toolTipPosX = hostElPosLeft + 20; // [ px ]
    const toolTipPosY =
      hostElPosTop + hostElPosHeight - parentElementScrolling - 10;

    //toolTip Styling
    tooltipElement.style.position = 'absolute';
    tooltipElement.style.left = toolTipPosX + 'px';
    tooltipElement.style.top = toolTipPosY + 'px';

    tooltipElement.addEventListener('click', this.closeTooltip);
    this.element = tooltipElement;
  }
}

class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectItemElement = document.getElementById(this.id);
    const toolTipText = projectItemElement.dataset.extraInfo;
    const tooltip = new Tooltip(
      () => {
        this.hasActiveTooltip = false;
      },
      toolTipText,
      this.id
    );
    tooltip.attach();
    this.hasActiveTooltip = true;
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector(
      'button:first-of-type'
    );
    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));
  }

  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector('button:last-of-type');
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchBtn.addEventListener(
      'click',
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  update(updateProjectListsFn, type) {
    this.updateProjectListsHandler = updateProjectListsFn;
    this.connectSwitchButton(type);
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
    console.log(this.projects);
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(projectId) {
    // const projectIndex = this.projects.findIndex(p => p.id === projectId);
    // this.projects.splice(projectIndex, 1);
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}

class App {
  static init() {
    const activeProjectsList = new ProjectList('active');
    const finishedProjectsList = new ProjectList('finished');
    activeProjectsList.setSwitchHandlerFunction(
      finishedProjectsList.addProject.bind(finishedProjectsList)
    );
    finishedProjectsList.setSwitchHandlerFunction(
      activeProjectsList.addProject.bind(activeProjectsList)
    );
  }
}

App.init();
