import tornado.web

def main():
    application = tornado.web.Application([
        (r"/add_part")
    ])

if __name__ == "__main__":
    main()
