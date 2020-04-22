import { AfterViewInit, Component, ViewChild, ViewChildren, ElementRef,   QueryList, HostListener
 } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements AfterViewInit  {
  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;
  
  private itemContainer: any;
  private scrollContainer: any;
  private items = [];
  private isNearBottom = true;

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());    

    // Add a new item every 2 seconds for demo purposes
    setInterval(() => {
      this.items.push({});
    }, 2000);
  }
  
  private onItemElementsChanged(): void {
    if (this.isNearBottom) {
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  private isUserNearBottom(): boolean {
    const threshold = 150;
    const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
    const height = this.scrollContainer.scrollHeight;
    return position > height - threshold;
  }

  scrolled(event: any): void {
    this.isNearBottom = this.isUserNearBottom();
  }
  
  // Uncomment these lines, you you need to scroll the full window.
  // Make sure, to remove 'position: absolute;' from the CSS to test that behaviour.
  /*
  private scrollToBottom(): void {
    window.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  private isUserNearBottom(): boolean {
    const threshold = 150;
    const position = window.scrollY + window.innerHeight;
    const height = document.body.scrollHeight;
    return position > height - threshold;
  }

  @HostListener('window:scroll', ['$event'])
  scrolled(event: any): void {
    this.isNearBottom = this.isUserNearBottom();
  }*/
}