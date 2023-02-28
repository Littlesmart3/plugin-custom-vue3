export class DraggableDivX {
  private element: HTMLElement;
  private isDragging: boolean = false;
  private containerRef: HTMLElement;

  constructor(element: HTMLElement, containerRef: HTMLElement) {
    this.containerRef = containerRef;
    this.element = element;
    this.element.addEventListener('mousedown', this.onMouseDown.bind(this));
  }

  private onMouseDown(event: MouseEvent) {
    this.removeEventListener();
    this.isDragging = true;
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  private onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    let transformX = 0;

    const parentRect = this.element.parentElement!.getBoundingClientRect();
    const x = event.clientX - parentRect.left;

    if (x < 0) transformX = 0;
    else if (x > parentRect.width) transformX = parentRect.width;
    else transformX = x;

    if (this.containerRef && event.clientX > (this.containerRef.offsetLeft + this.containerRef.offsetWidth) * 0.9) {
      console.log(this.containerRef.scrollLeft);
      const left = this.containerRef.scrollLeft + 1;

      this.containerRef.scrollTo({ left: left });
    }

    this.element.style.transform = `translate(${transformX}px)`;
  }

  private onMouseUp(event: MouseEvent) {
    this.isDragging = false;
    this.removeEventListener();
  }

  // 移除监听事件
  private removeEventListener() {
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }
}
