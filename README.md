
    /home/simi/Documents/Projects/src/app/lake-detail/lake-detail.ts:26:50:
      26 │     console.log('[lifecycle] id in constructor:', this.id());



**What happened when I read `this.id()` in the constructor?**
The detail page crashed with error NG0950, saying the required input `id` had no value yet.

**What caused `ngOnDestroy` to run?**
Leaving the detail page, by clicking "Back to all lakes" or pressing the browser's back button,
logged the "closed" message every time. This shows the router destroys a page's
