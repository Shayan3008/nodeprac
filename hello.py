import sys
import json
name = sys.argv[1]


def palindrome():
    reverse = name[::-1]
    print(name)
    if(name == reverse):
        return json.dumps({
            "ans": True
        })
    else:
        return json.dumps({
            "ans": False
        })


if __name__ == '__main__':
    print(palindrome())
