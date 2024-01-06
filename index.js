document.getElementById('widthInput').addEventListener('change', function () {
    const newWidth = parseInt(this.value);
    if (!isNaN(newWidth) && newWidth > 0) {
        document.getElementById('container').style.width = `${newWidth}px`;
        randomizeArray();
    } else {
        alert('Invalid input. Please enter a positive numeric value for width.');
    }
});

document.getElementById('heightInput').addEventListener('change', function () {
    const newHeight = parseInt(this.value);
    if (!isNaN(newHeight) && newHeight > 0) {
        document.getElementById('container').style.height = `${newHeight}px`;
        randomizeArray();
    } else {
        alert('Invalid input. Please enter a positive numeric value for height.');
    }
});

let bars = [];
let animationSpeed = 1000; // Default animation speed in milliseconds
let animationPaused = false;
let animationIndex = 0;
let animationSteps = [];

function createBars() {
    const container = document.getElementById('container');
    container.innerHTML = '';

    bars.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value}px`;

        const span = document.createElement('span');
        span.textContent = value;

        bar.appendChild(span);
        container.appendChild(bar);
    });
}

function randomizeArray() {
    bars = Array.from({ length: 50 }, () => Math.floor(Math.random() * 200) + 1);
    createBars();
}

function sortArray(algorithm) {
    animationIndex = 0;
    animationPaused = false;
    animationSteps = [];

    switch (algorithm) {
        case 'insertionSort':
            insertionSort();
            break;
        case 'selectionSort':
            selectionSort();
            break;
        case 'bubbleSort':
            bubbleSort();
            break;
        case 'quickSort':
            quickSort();
            break;
        case 'mergeSort':
            mergeSort();
            break;
        case 'shellSort':
            shellSort();
            break;
        // Add other cases for different sorting algorithms
        default:
            break;
    }
}

function insertionSort() {
    let tempBars = bars.slice(); // Create a copy of the original array
    for (let i = 1; i < tempBars.length; i++) {
        let key = tempBars[i];
        let j = i - 1;
        while (j >= 0 && tempBars[j] > key) {
            tempBars[j + 1] = tempBars[j];
            j = j - 1;
        }
        tempBars[j + 1] = key;
        animationSteps.push(tempBars.slice()); // Save the state of the array after each step
    }
    animateSort();
}

function selectionSort() {
    let tempBars = bars.slice(); // Create a copy of the original array
    let n = tempBars.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            if (tempBars[j] < tempBars[minIndex]) {
                minIndex = j;
            }
        }

        // Swap
        let temp = tempBars[i];
        tempBars[i] = tempBars[minIndex];
        tempBars[minIndex] = temp;

        animationSteps.push(tempBars.slice()); // Save the state of the array after each step
    }

    animateSort();
}

function bubbleSort() {
    let tempBars = bars.slice(); // Create a copy of the original array
    let n = tempBars.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (tempBars[j] > tempBars[j + 1]) {
                // Swap
                let temp = tempBars[j];
                tempBars[j] = tempBars[j + 1];
                tempBars[j + 1] = temp;

                animationSteps.push(tempBars.slice()); // Save the state of the array after each step
            }
        }
    }

    animateSort();
}

function quickSort() {
    let tempBars = bars.slice(); // Create a copy of the original array
    animationSteps = [];
    quickSortHelper(tempBars, 0, tempBars.length - 1);
    animateSort();
}

function quickSortHelper(arr, low, high) {
    if (low < high) {
        let pi = partition(arr, low, high);

        quickSortHelper(arr, low, pi - 1);
        quickSortHelper(arr, pi + 1, high);
    }
}

function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;

            // Swap
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            animationSteps.push(arr.slice()); // Save the state of the array after each step
        }
    }

    // Swap
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    animationSteps.push(arr.slice()); // Save the state of the array after each step

    return i + 1;
}

function mergeSort() {
    let tempBars = bars.slice(); // Create a copy of the original array
    animationSteps = [];
    mergeSortHelper(tempBars, 0, tempBars.length - 1);
    animateSort();
}

function mergeSortHelper(arr, low, high) {
    if (low < high) {
        let mid = Math.floor((low + high) / 2);

        mergeSortHelper(arr, low, mid);
        mergeSortHelper(arr, mid + 1, high);

        merge(arr, low, mid, high);
    }
}

function merge(arr, low, mid, high) {
    let n1 = mid - low + 1;
    let n2 = high - mid;

    let left = new Array(n1);
    let right = new Array(n2);

    for (let i = 0; i < n1; i++) {
        left[i] = arr[low + i];
    }
    for (let j = 0; j < n2; j++) {
        right[j] = arr[mid + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = low;

    while (i < n1 && j < n2) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = left[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = right[j];
        j++;
        k++;
    }

    animationSteps.push(arr.slice()); // Save the state of the array after each step
}




function shellSort() {
    let tempBars = bars.slice(); // Create a copy of the original array
    let n = tempBars.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let I = gap; I < n; I++) {
            let temp = tempBars[I];
            let j;

            for (j = I; j >= gap && tempBars[j - gap] > temp; j -= gap) {
                tempBars[j] = tempBars[j - gap];
            }

            tempBars[j] = temp;
            animationSteps.push(tempBars.slice()); // Save the state of the array after each step
        }
    }

    animateSort();
}

function moveBars() {
    const newPosition = prompt('Enter the new position for bars (e.g., 150):');
    const parsedPosition = parseInt(newPosition);

    if (!isNaN(parsedPosition) && parsedPosition >= 0) {
        bars = bars.map(() => Math.random() * parsedPosition);
        createBars();
    } else {
        alert('Invalid input. Please enter a non-negative numeric value.');
    }
}

function changeCanvasSize() {
    const newHeight = prompt('Enter new canvas height (e.g., 300):');
    const parsedHeight = parseInt(newHeight);

    if (!isNaN(parsedHeight) && parsedHeight > 0) {
        document.getElementById('container').style.height = `${parsedHeight}px`;
    } else {
        alert('Invalid input. Please enter a positive numeric value.');
    }
}

function animateSort() {
    if (!animationPaused && animationIndex < animationSteps.length) {
        bars = animationSteps[animationIndex];
        createBars();
        animationIndex++;
        setTimeout(animateSort, animationSpeed);
    }
}

function animateSort() {
    if (!animationPaused && animationIndex < animationSteps.length) {
        bars = animationSteps[animationIndex];
        createBars();
        animationIndex++;
        setTimeout(animateSort, animationSpeed);
    } else {
        // Animation completed, show the message
        document.getElementById('animationCompletedMessage').style.display = 'block';
    }
}

function pause() {
    animationPaused = true;
}

function skipBack() {
    animationIndex = 0;
    animationPaused = true;
    bars = (animationSteps.length > 0) ? animationSteps[0] : [];
    createBars();
}

function stepBack() {
    if (animationIndex > 0) {
        animationIndex--;
        animationPaused = true;
        bars = animationSteps[animationIndex];
        createBars();
    }
}

function skipForward() {
    animationIndex = animationSteps.length - 1;
    animationPaused = true;
    bars = (animationSteps.length > 0) ? animationSteps[animationIndex] : [];
    createBars();
}

function stepForward() {
    if (animationIndex < animationSteps.length - 1) {
        animationIndex++;
        animationPaused = true;
        bars = animationSteps[animationIndex];
        createBars();
    }
}

function changeSpeed(value) {
    animationSpeed = 1000 / value;
}

function changeSize() {
    bars = bars.map(value => value / 2);
    createBars();
}

// Initial random array creation
randomizeArray();
