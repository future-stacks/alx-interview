#include <stdio.h>

/*
 * Complete the 'fizzBuzz' function below.
 *
 * The function accepts INTEGER n as parameter.
 */

void fizzBuzz(int n) {
    for (int i = 1; i <= n; i++) {
        if (i % 15 == 0)
            printf("FizzBuzz\n");
        else if (i % 3 == 0)
            printf("Fizz\n");
        else if (i % 5 == 0)
            printf("Buzz\n");
        else
            printf("%d\n", i);
    }
}

int main(void) {
    int n;

    if (scanf("%d", &n) != 1)
        return 1;
    fizzBuzz(n);
    return 0;
}
