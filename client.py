import asyncio
from fastmcp import Client, FastMCP

# In-memory server (ideal for testing)
# server = FastMCP("TestServer")
# client = Client(server)

# HTTP server
client = Client("https://8000-firebase-mcp-demo-1752471079332.cluster-ubrd2huk7jh6otbgyei4h62ope.cloudworkstations.dev/mcp")

# Local Python script
# client = Client("my_mcp_server.py")

async def main():
    async with client:
        # Basic server interaction
        print(f"Connected: {client.is_connected()}")
        # await client.ping()
        
        # # List available operations
        # tools = await client.list_tools()
        # resources = await client.list_resources()
        # prompts = await client.list_prompts()
        # print(tools)
        # print(resources)
        # Execute operations
        # result = await client.call_tool("example_tool", {"param": "value"})
        # print(result)

asyncio.run(main())